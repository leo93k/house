# Git 브랜치 전략

## 1. 브랜치 전략 개요

### 1.1 전략 선택

-   **Git Flow 기반**: 안정적인 릴리스 관리
-   **OTA 업데이트 지원**: CodePush/EAS Update를 통한 빠른 업데이트
-   **환경 분리**: 개발, 스테이징, 프로덕션 환경 분리

### 1.2 브랜치 구조

```
main (production)
  ├── develop (development)
  ├── staging (staging)
  ├── feature/* (feature branches)
  ├── hotfix/* (hotfix branches)
  └── release/* (release branches)
```

## 2. 브랜치 설명

### 2.1 메인 브랜치

#### `main` (프로덕션)

-   **용도**: 프로덕션 환경에 배포되는 안정적인 코드
-   **보호**: 직접 푸시 불가, Pull Request만 허용
-   **배포**: App Store / Google Play에 배포
-   **OTA 채널**: `production`
-   **버전**: Semantic Versioning (예: `1.0.0`)

**규칙:**

-   항상 배포 가능한 상태 유지
-   `release/*` 브랜치에서만 머지
-   `hotfix/*` 브랜치에서 직접 머지 가능 (긴급 수정)
-   태그로 버전 관리 (`v1.0.0`, `v1.1.0` 등)

#### `develop` (개발)

-   **용도**: 개발 중인 기능 통합
-   **배포**: 개발 환경 (TestFlight Internal / Internal Testing)
-   **OTA 채널**: `development`
-   **버전**: 개발 버전 (예: `1.0.0-dev.1`)

**규칙:**

-   `feature/*` 브랜치에서 머지
-   항상 최신 개발 상태 유지
-   자동 테스트 통과 필수

#### `staging` (스테이징)

-   **용도**: 프로덕션 배포 전 최종 테스트
-   **배포**: 스테이징 환경 (TestFlight External / Closed Testing)
-   **OTA 채널**: `staging`
-   **버전**: 스테이징 버전 (예: `1.0.0-staging.1`)

**규칙:**

-   `release/*` 브랜치에서 머지
-   프로덕션과 동일한 환경에서 테스트
-   QA 테스트 완료 후 `main`으로 머지

### 2.2 보조 브랜치

#### `feature/*` (기능 개발)

-   **용도**: 새로운 기능 개발
-   **기준 브랜치**: `develop`
-   **네이밍**: `feature/매물-검색-필터`, `feature/채팅-기능` 등

**규칙:**

-   기능별로 브랜치 생성
-   개발 완료 후 `develop`으로 Pull Request
-   코드 리뷰 필수
-   머지 후 브랜치 삭제

**예시:**

```bash
# 브랜치 생성
git checkout -b feature/매물-검색-필터 develop

# 개발 및 커밋
git add .
git commit -m "feat: 매물 검색 필터 기능 추가"

# develop으로 머지
git checkout develop
git merge feature/매물-검색-필터
git branch -d feature/매물-검색-필터
```

#### `release/*` (릴리스 준비)

-   **용도**: 프로덕션 배포 전 릴리스 준비
-   **기준 브랜치**: `develop`
-   **네이밍**: `release/v1.0.0`, `release/v1.1.0` 등

**규칙:**

-   버전 번호로 브랜치 생성
-   버그 수정만 허용 (새 기능 추가 금지)
-   테스트 완료 후 `main`과 `develop`으로 머지
-   태그 생성 후 브랜치 삭제

**예시:**

```bash
# 릴리스 브랜치 생성
git checkout -b release/v1.0.0 develop

# 버전 번호 업데이트
# package.json, app.json 등

# 버그 수정
git commit -m "fix: 매물 상세 화면 버그 수정"

# main과 develop으로 머지
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

git checkout develop
git merge release/v1.0.0

# 브랜치 삭제
git branch -d release/v1.0.0
```

#### `hotfix/*` (긴급 수정)

-   **용도**: 프로덕션 긴급 버그 수정
-   **기준 브랜치**: `main`
-   **네이밍**: `hotfix/매물-상세-크래시`, `hotfix/v1.0.1` 등

**규칙:**

-   프로덕션 긴급 버그 수정용
-   `main`에서 직접 생성
-   수정 후 `main`과 `develop`으로 머지
-   패치 버전 업데이트 (예: `1.0.0` → `1.0.1`)

**예시:**

```bash
# hotfix 브랜치 생성
git checkout -b hotfix/v1.0.1 main

# 버그 수정
git commit -m "fix: 매물 상세 화면 크래시 수정"

# main과 develop으로 머지
git checkout main
git merge hotfix/v1.0.1
git tag -a v1.0.1 -m "Hotfix version 1.0.1"

git checkout develop
git merge hotfix/v1.0.1

# 브랜치 삭제
git branch -d hotfix/v1.0.1
```

## 3. OTA 업데이트 전략 (CodePush/EAS Update)

### 3.1 OTA 업데이트 개요

-   **용도**: 네이티브 코드 변경 없이 JS 번들 업데이트
-   **제한사항**: 네이티브 모듈 변경 시 앱 스토어 재배포 필요
-   **채널**: 환경별 채널 분리

### 3.2 채널 구조

```
production    # 프로덕션 환경 (main 브랜치)
staging       # 스테이징 환경 (staging 브랜치)
development   # 개발 환경 (develop 브랜치)
```

### 3.3 OTA 업데이트 규칙

#### 네이티브 코드 변경 없을 때

-   JS/TS 코드 변경만 있는 경우
-   `package.json` 의존성 추가/변경 없을 때
-   `app.json` 설정 변경 없을 때
-   **처리**: OTA 업데이트로 배포

**예시:**

```bash
# develop 브랜치에서 개발
git checkout develop
# JS 코드 수정
git commit -m "fix: 매물 카드 스타일 수정"

# EAS Update로 배포
eas update --branch development --message "매물 카드 스타일 수정"
```

#### 네이티브 코드 변경이 있을 때

-   네이티브 모듈 추가/변경
-   `package.json`에 네이티브 모듈 추가
-   `app.json` 설정 변경 (예: 버전 번호)
-   **처리**: 앱 스토어 재배포 필요

**예시:**

```bash
# 네이티브 모듈 추가
yarn add react-native-maps

# 버전 업데이트
# app.json: "version": "1.0.1"

# 커밋 및 릴리스
git checkout -b release/v1.0.1 develop
git commit -m "feat: 지도 기능 추가 (네이티브 모듈)"
git checkout main
git merge release/v1.0.1

# EAS Build로 앱 빌드
eas build --platform ios --profile production
eas build --platform android --profile production

# 앱 스토어 배포
```

### 3.4 OTA 업데이트 워크플로우

#### 개발 환경 (develop)

```bash
# 1. develop 브랜치에서 개발
git checkout develop
git pull origin develop

# 2. JS 코드 수정
# ... 코드 수정 ...

# 3. 커밋 및 푸시
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin develop

# 4. EAS Update로 배포
eas update --branch development --message "새로운 기능 추가"
```

#### 스테이징 환경 (staging)

```bash
# 1. staging 브랜치로 머지
git checkout staging
git merge develop
git push origin staging

# 2. EAS Update로 배포
eas update --branch staging --message "스테이징 배포"
```

#### 프로덕션 환경 (main)

```bash
# 1. main 브랜치로 머지
git checkout main
git merge staging
git push origin main

# 2. EAS Update로 배포
eas update --branch production --message "프로덕션 배포"
```

## 4. 버전 관리

### 4.1 Semantic Versioning

**형식**: `MAJOR.MINOR.PATCH`

-   **MAJOR**: 네이티브 코드 변경, 큰 기능 추가
-   **MINOR**: 새로운 기능 추가 (네이티브 변경 없음)
-   **PATCH**: 버그 수정 (OTA 업데이트 가능)

**예시:**

-   `1.0.0`: 초기 릴리스
-   `1.0.1`: 버그 수정 (OTA)
-   `1.1.0`: 새로운 기능 추가 (OTA)
-   `2.0.0`: 네이티브 코드 변경 (앱 스토어 재배포)

### 4.2 버전 관리 파일

**app.json (Expo)**

```json
{
    "expo": {
        "version": "1.0.0",
        "ios": {
            "buildNumber": "1"
        },
        "android": {
            "versionCode": 1
        }
    }
}
```

**package.json**

```json
{
    "version": "1.0.0"
}
```

### 4.3 버전 업데이트 규칙

#### OTA 업데이트 (PATCH, MINOR)

-   `app.json`의 `version`은 변경하지 않음
-   `package.json`의 `version`만 업데이트 (선택)
-   EAS Update로 배포

#### 네이티브 빌드 (MAJOR)

-   `app.json`의 `version` 업데이트
-   iOS `buildNumber` 증가
-   Android `versionCode` 증가
-   EAS Build로 빌드 후 앱 스토어 배포

## 5. 배포 전략

### 5.1 배포 파이프라인

```
개발 (develop)
  ↓ (Pull Request)
스테이징 (staging)
  ↓ (QA 테스트)
프로덕션 (main)
```

### 5.2 배포 단계

#### 1단계: 개발 환경

-   **브랜치**: `develop`
-   **배포 방법**: EAS Update
-   **대상**: 개발팀, 내부 테스터
-   **채널**: `development`

#### 2단계: 스테이징 환경

-   **브랜치**: `staging`
-   **배포 방법**: EAS Update 또는 TestFlight/Internal Testing
-   **대상**: QA 팀, 베타 테스터
-   **채널**: `staging`

#### 3단계: 프로덕션 환경

-   **브랜치**: `main`
-   **배포 방법**:
    -   OTA: EAS Update (JS 변경만)
    -   네이티브: EAS Build → App Store / Google Play
-   **대상**: 모든 사용자
-   **채널**: `production`

### 5.3 배포 체크리스트

#### OTA 업데이트 전

-   [ ] 네이티브 코드 변경 없음 확인
-   [ ] 의존성 변경 없음 확인
-   [ ] `app.json` 설정 변경 없음 확인
-   [ ] 코드 리뷰 완료
-   [ ] 테스트 완료
-   [ ] 버전 태그 생성 (선택)

#### 네이티브 빌드 전

-   [ ] 버전 번호 업데이트
-   [ ] 빌드 번호 증가
-   [ ] 변경사항 문서화
-   [ ] 코드 리뷰 완료
-   [ ] QA 테스트 완료
-   [ ] 릴리스 노트 작성
-   [ ] 태그 생성

## 6. 커밋 메시지 컨벤션

### 6.1 컨벤셔널 커밋

**형식**: `<type>(<scope>): <subject>`

**타입:**

-   `feat`: 새로운 기능
-   `fix`: 버그 수정
-   `docs`: 문서 수정
-   `style`: 코드 포맷팅 (기능 변경 없음)
-   `refactor`: 코드 리팩토링
-   `test`: 테스트 추가/수정
-   `chore`: 빌드 프로세스, 도구 변경
-   `perf`: 성능 개선
-   `ci`: CI/CD 설정 변경

**예시:**

```bash
feat(매물): 검색 필터 기능 추가
fix(채팅): 메시지 전송 실패 버그 수정
docs(readme): 설치 방법 업데이트
refactor(매물): PropertyCard 컴포넌트 리팩토링
```

### 6.2 커밋 메시지 규칙

-   제목은 50자 이내
-   본문은 72자마다 줄바꿈
-   제목 끝에 마침표 사용하지 않음
-   명령형으로 작성 (예: "추가한다" → "추가")

## 7. Pull Request 전략

### 7.1 PR 규칙

#### 필수 사항

-   코드 리뷰 1명 이상 승인
-   CI/CD 테스트 통과
-   충돌 해결 완료
-   관련 이슈 링크

#### PR 템플릿

```markdown
## 변경 사항

-   변경 내용 설명

## 변경 타입

-   [ ] 기능 추가
-   [ ] 버그 수정
-   [ ] 문서 수정
-   [ ] 리팩토링
-   [ ] 성능 개선

## 테스트

-   테스트 방법 설명

## 체크리스트

-   [ ] 코드 리뷰 완료
-   [ ] 테스트 완료
-   [ ] 문서 업데이트 (필요시)
```

### 7.2 PR 머지 규칙

#### Squash and Merge

-   `feature/*` → `develop`: Squash and Merge
-   여러 커밋을 하나로 통합
-   깔끔한 히스토리 유지

#### Merge Commit

-   `release/*` → `main`: Merge Commit
-   `hotfix/*` → `main`: Merge Commit
-   릴리스 히스토리 보존

#### Rebase and Merge

-   사용하지 않음 (충돌 위험)

## 8. 태그 전략

### 8.1 태그 규칙

**형식**: `v<MAJOR>.<MINOR>.<PATCH>`

**예시:**

-   `v1.0.0`: 초기 릴리스
-   `v1.0.1`: 패치 릴리스
-   `v1.1.0`: 마이너 릴리스
-   `v2.0.0`: 메이저 릴리스

### 8.2 태그 생성

```bash
# Annotated 태그 생성
git tag -a v1.0.0 -m "Release version 1.0.0"

# 태그 푸시
git push origin v1.0.0

# 모든 태그 푸시
git push origin --tags
```

## 9. CI/CD 통합

### 9.1 자동화 워크플로우

#### develop 브랜치 푸시 시

-   자동 테스트 실행
-   린터 실행
-   빌드 테스트
-   EAS Update 자동 배포 (선택)

#### staging 브랜치 푸시 시

-   자동 테스트 실행
-   EAS Update 배포
-   QA 팀 알림

#### main 브랜치 머지 시

-   자동 테스트 실행
-   EAS Update 배포
-   릴리스 노트 생성
-   태그 자동 생성 (선택)

### 9.2 GitHub Actions 예시

```yaml
# .github/workflows/ci.yml
name: CI

on:
    push:
        branches: [develop, staging, main]
    pull_request:
        branches: [develop, staging, main]

jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
            - run: yarn install
            - run: yarn lint
            - run: yarn test
```

## 10. 긴급 상황 대응

### 10.1 Hotfix 프로세스

1. **긴급 버그 발견**
2. **hotfix 브랜치 생성** (`main`에서)
3. **버그 수정**
4. **테스트**
5. **main과 develop으로 머지**
6. **OTA 업데이트 배포** (네이티브 변경 없을 때)
7. **앱 스토어 재배포** (네이티브 변경 있을 때)

### 10.2 롤백 전략

#### OTA 업데이트 롤백

```bash
# 이전 버전으로 롤백
eas update --branch production --message "롤백: v1.0.0"
```

#### 네이티브 빌드 롤백

-   이전 버전 태그로 체크아웃
-   앱 스토어에 이전 버전 재배포

## 11. 브랜치 보호 규칙

### 11.1 main 브랜치 보호

-   직접 푸시 금지
-   Pull Request 필수
-   코드 리뷰 1명 이상 필수
-   CI/CD 테스트 통과 필수
-   충돌 해결 필수

### 11.2 develop 브랜치 보호

-   직접 푸시 가능 (개발팀)
-   Pull Request 권장
-   CI/CD 테스트 통과 필수

### 11.3 staging 브랜치 보호

-   Pull Request 필수
-   코드 리뷰 1명 이상 필수
-   CI/CD 테스트 통과 필수

## 12. 모바일 앱 특화 고려사항

### 12.1 네이티브 코드 변경 감지

**자동 감지 스크립트:**

```bash
#!/bin/bash
# scripts/check-native-changes.sh

# 네이티브 코드 변경 확인
if git diff --name-only origin/main...HEAD | grep -E "(ios|android|app.json|package.json)" | grep -v "\.(js|ts|tsx)$"; then
  echo "⚠️  네이티브 코드 변경 감지 - 앱 스토어 재배포 필요"
  exit 1
else
  echo "✅ 네이티브 코드 변경 없음 - OTA 업데이트 가능"
  exit 0
fi
```

### 12.2 버전 충돌 방지

-   네이티브 빌드 시 버전 자동 증가
-   OTA 업데이트 시 버전 유지
-   버전 충돌 감지 스크립트

### 12.3 다중 플랫폼 관리

-   iOS와 Android 동시 배포
-   플랫폼별 빌드 번호 관리
-   플랫폼별 OTA 채널 (선택)

## 13. 예시 워크플로우

### 13.1 일반 기능 개발

```bash
# 1. develop 브랜치에서 시작
git checkout develop
git pull origin develop

# 2. feature 브랜치 생성
git checkout -b feature/매물-검색-필터

# 3. 개발 및 커밋
git add .
git commit -m "feat(매물): 검색 필터 기능 추가"
git push origin feature/매물-검색-필터

# 4. Pull Request 생성
# GitHub/GitLab에서 PR 생성

# 5. 코드 리뷰 및 머지
# 리뷰어 승인 후 develop으로 머지

# 6. OTA 업데이트 배포
git checkout develop
git pull origin develop
eas update --branch development --message "매물 검색 필터 기능 추가"
```

### 13.2 릴리스 프로세스

```bash
# 1. release 브랜치 생성
git checkout develop
git checkout -b release/v1.1.0

# 2. 버전 업데이트
# app.json, package.json 수정

# 3. 버그 수정 (필요시)
git commit -m "fix: 릴리스 전 버그 수정"

# 4. staging으로 머지
git checkout staging
git merge release/v1.1.0
git push origin staging

# 5. 스테이징 배포 및 테스트
eas update --branch staging --message "릴리스 v1.1.0 스테이징"

# 6. QA 테스트 완료 후 main으로 머지
git checkout main
git merge release/v1.1.0
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin main --tags

# 7. 프로덕션 배포
eas update --branch production --message "릴리스 v1.1.0"
```

### 13.3 긴급 Hotfix

```bash
# 1. hotfix 브랜치 생성
git checkout main
git checkout -b hotfix/v1.0.1

# 2. 버그 수정
git commit -m "fix: 매물 상세 화면 크래시 수정"

# 3. main으로 머지
git checkout main
git merge hotfix/v1.0.1
git tag -a v1.0.1 -m "Hotfix version 1.0.1"
git push origin main --tags

# 4. develop으로 머지
git checkout develop
git merge hotfix/v1.0.1
git push origin develop

# 5. OTA 업데이트 배포
eas update --branch production --message "긴급 수정: 매물 상세 화면 크래시"
```

## 14. 모니터링 및 알림

### 14.1 배포 알림

-   Slack/Discord 알림
-   이메일 알림
-   배포 상태 대시보드

### 14.2 배포 모니터링

-   OTA 업데이트 배포 상태
-   사용자 업데이트 수신률
-   에러 발생률 모니터링

## 15. 체크리스트

### 15.1 브랜치 생성 전

-   [ ] 적절한 브랜치 타입 선택 (feature/release/hotfix)
-   [ ] 기준 브랜치 확인
-   [ ] 브랜치 이름 규칙 준수

### 15.2 커밋 전

-   [ ] 코드 리뷰 준비 완료
-   [ ] 테스트 통과
-   [ ] 커밋 메시지 컨벤션 준수
-   [ ] 불필요한 파일 제외

### 15.3 PR 생성 전

-   [ ] 코드 리뷰 요청
-   [ ] PR 템플릿 작성
-   [ ] 관련 이슈 링크
-   [ ] 스크린샷/동영상 (UI 변경 시)

### 15.4 배포 전

-   [ ] 네이티브 코드 변경 확인
-   [ ] 버전 번호 확인
-   [ ] 테스트 완료
-   [ ] 릴리스 노트 작성
-   [ ] 롤백 계획 수립

---

**작성일**: 2024년
**버전**: 1.0
**업데이트**: 프로젝트 진행에 따라 지속적으로 업데이트
