# Socket.io 채팅 기능 가이드

## 1. 개요

### 1.1 채팅 기능 요구사항

-   **매물 문의 채팅**: 임차인이 특정 매물에 대해 문의
-   **1:1 채팅**: 임차인과 임대인/중개사 간 직접 채팅
-   **실시간 메시지 전송 및 수신**
-   **읽음 처리**: 메시지 읽음 상태 표시
-   **타이핑 인디케이터**: 상대방이 입력 중임을 표시
-   **알림**: 새 메시지 알림
-   **메시지 히스토리**: 과거 메시지 조회

### 1.2 기술 스택

-   **서버**: Socket.io (Node.js)
-   **클라이언트**: socket.io-client (React Native)
-   **인증**: JWT 토큰 기반 인증
-   **데이터베이스**: PostgreSQL (메시지 저장)

## 2. 아키텍처 설계

### 2.1 Namespace 구조

채팅 타입별로 Namespace를 분리하여 관리합니다.

```
/chat              # 일반 채팅 (1:1 채팅)
/property-inquiry  # 매물 문의 채팅
```

#### Namespace 선택 기준

-   **일반 채팅 (`/chat`)**: 사용자 간 직접 채팅
-   **매물 문의 (`/property-inquiry`)**: 특정 매물에 대한 문의 채팅

### 2.2 Room 구조

각 채팅방은 Room으로 관리됩니다.

#### Room ID 생성 규칙

**일반 채팅 (1:1)**

```
roomId: `chat:${userId1}:${userId2}` (정렬된 사용자 ID)
예: chat:user123:user456
```

**매물 문의 채팅**

```
roomId: `property:${propertyId}:${inquirerId}:${ownerId}`
예: property:prop123:user456:user789
```

#### Room 관리

-   각 Room은 고유한 ID를 가짐
-   Room에 참여한 사용자만 메시지를 주고받을 수 있음
-   Room은 사용자가 나가도 유지 (메시지 히스토리 보존)

### 2.3 이벤트 구조

#### 클라이언트 → 서버 이벤트

| 이벤트명       | 설명                 | 데이터 구조                                           |
| -------------- | -------------------- | ----------------------------------------------------- |
| `join-room`    | 채팅방 입장          | `{ roomId: string }`                                  |
| `leave-room`   | 채팅방 퇴장          | `{ roomId: string }`                                  |
| `send-message` | 메시지 전송          | `{ roomId: string, content: string, type?: string }`  |
| `typing-start` | 타이핑 시작          | `{ roomId: string }`                                  |
| `typing-stop`  | 타이핑 중지          | `{ roomId: string }`                                  |
| `mark-read`    | 메시지 읽음 처리     | `{ roomId: string, messageId: string }`               |
| `get-history`  | 메시지 히스토리 조회 | `{ roomId: string, limit?: number, before?: string }` |

#### 서버 → 클라이언트 이벤트

| 이벤트명              | 설명                  | 데이터 구조                                                                          |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------ |
| `message`             | 새 메시지 수신        | `{ id: string, roomId: string, senderId: string, content: string, createdAt: Date }` |
| `message-read`        | 메시지 읽음 처리 확인 | `{ messageId: string, readBy: string, readAt: Date }`                                |
| `user-typing`         | 상대방 타이핑 중      | `{ roomId: string, userId: string }`                                                 |
| `user-stopped-typing` | 상대방 타이핑 중지    | `{ roomId: string, userId: string }`                                                 |
| `user-joined`         | 사용자 채팅방 입장    | `{ roomId: string, userId: string }`                                                 |
| `user-left`           | 사용자 채팅방 퇴장    | `{ roomId: string, userId: string }`                                                 |
| `error`               | 에러 발생             | `{ message: string, code?: string }`                                                 |

## 3. 서버 구현

### 3.1 서버 설정

```typescript
// server.ts
import { Server } from "socket.io";
import { createServer } from "http";
import jwt from "jsonwebtoken";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*", // 프로덕션에서는 특정 도메인으로 제한
        methods: ["GET", "POST"],
    },
});

// JWT 인증 미들웨어
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication error"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        socket.data.user = decoded;
        next();
    } catch (err) {
        next(new Error("Authentication error"));
    }
});
```

### 3.2 Namespace 생성

```typescript
// 일반 채팅 Namespace
const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
    const userId = socket.data.user.id;

    // 사용자 ID로 소켓을 그룹화 (개인 알림용)
    socket.join(`user:${userId}`);

    // 채팅방 입장
    socket.on("join-room", async ({ roomId }) => {
        try {
            // 권한 확인 (해당 채팅방에 접근 권한이 있는지)
            const hasAccess = await checkRoomAccess(userId, roomId);

            if (!hasAccess) {
                socket.emit("error", { message: "Access denied" });
                return;
            }

            socket.join(roomId);
            socket.to(roomId).emit("user-joined", { roomId, userId });

            // 메시지 히스토리 전송
            const history = await getMessageHistory(roomId, 50);
            socket.emit("message-history", { roomId, messages: history });
        } catch (error) {
            socket.emit("error", { message: "Failed to join room" });
        }
    });

    // 채팅방 퇴장
    socket.on("leave-room", ({ roomId }) => {
        socket.leave(roomId);
        socket.to(roomId).emit("user-left", { roomId, userId });
    });

    // 메시지 전송
    socket.on("send-message", async ({ roomId, content, type = "text" }) => {
        try {
            // 권한 확인
            const hasAccess = await checkRoomAccess(userId, roomId);
            if (!hasAccess) {
                socket.emit("error", { message: "Access denied" });
                return;
            }

            // 메시지 저장
            const message = await saveMessage({
                roomId,
                senderId: userId,
                content,
                type,
            });

            // 같은 방의 다른 사용자에게 메시지 전송
            socket.to(roomId).emit("message", message);

            // 발신자에게도 확인 메시지 전송
            socket.emit("message-sent", { messageId: message.id });

            // 상대방에게 푸시 알림 (채팅방에 없을 경우)
            await sendPushNotification(roomId, userId, content);
        } catch (error) {
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    // 타이핑 시작
    socket.on("typing-start", ({ roomId }) => {
        socket.to(roomId).emit("user-typing", { roomId, userId });
    });

    // 타이핑 중지
    socket.on("typing-stop", ({ roomId }) => {
        socket.to(roomId).emit("user-stopped-typing", { roomId, userId });
    });

    // 메시지 읽음 처리
    socket.on("mark-read", async ({ roomId, messageId }) => {
        try {
            await markMessageAsRead(messageId, userId);
            socket.to(roomId).emit("message-read", {
                messageId,
                readBy: userId,
                readAt: new Date(),
            });
        } catch (error) {
            socket.emit("error", { message: "Failed to mark as read" });
        }
    });

    // 연결 해제
    socket.on("disconnect", () => {
        // 모든 채팅방에서 퇴장 처리
        // 필요시 구현
    });
});
```

### 3.3 매물 문의 Namespace

```typescript
// 매물 문의 채팅 Namespace
const propertyInquiryNamespace = io.of("/property-inquiry");

propertyInquiryNamespace.on("connection", (socket) => {
    const userId = socket.data.user.id;

    socket.join(`user:${userId}`);

    // 매물 문의 채팅방 입장
    socket.on("join-inquiry", async ({ propertyId, inquirerId, ownerId }) => {
        try {
            // 권한 확인: 문의자 또는 매물 소유자만 접근 가능
            if (userId !== inquirerId && userId !== ownerId) {
                socket.emit("error", { message: "Access denied" });
                return;
            }

            const roomId = `property:${propertyId}:${inquirerId}:${ownerId}`;
            socket.join(roomId);

            socket.to(roomId).emit("user-joined", { roomId, userId });

            // 메시지 히스토리 전송
            const history = await getMessageHistory(roomId, 50);
            socket.emit("message-history", { roomId, messages: history });
        } catch (error) {
            socket.emit("error", { message: "Failed to join inquiry" });
        }
    });

    // 메시지 전송 (일반 채팅과 동일)
    socket.on("send-message", async ({ roomId, content, type = "text" }) => {
        // 일반 채팅과 동일한 로직
    });

    // 기타 이벤트는 일반 채팅과 동일
});
```

### 3.4 유틸리티 함수

```typescript
// utils/chat.ts

/**
 * 채팅방 접근 권한 확인
 */
export async function checkRoomAccess(
    userId: string,
    roomId: string
): Promise<boolean> {
    // 일반 채팅방인 경우
    if (roomId.startsWith("chat:")) {
        const [_, user1, user2] = roomId.split(":");
        return userId === user1 || userId === user2;
    }

    // 매물 문의 채팅방인 경우
    if (roomId.startsWith("property:")) {
        const [_, propertyId, inquirerId, ownerId] = roomId.split(":");
        return userId === inquirerId || userId === ownerId;
    }

    return false;
}

/**
 * Room ID 생성 (일반 채팅)
 */
export function createChatRoomId(userId1: string, userId2: string): string {
    const sorted = [userId1, userId2].sort();
    return `chat:${sorted[0]}:${sorted[1]}`;
}

/**
 * Room ID 생성 (매물 문의)
 */
export function createPropertyInquiryRoomId(
    propertyId: string,
    inquirerId: string,
    ownerId: string
): string {
    return `property:${propertyId}:${inquirerId}:${ownerId}`;
}

/**
 * 메시지 저장
 */
export async function saveMessage(data: {
    roomId: string;
    senderId: string;
    content: string;
    type?: string;
}) {
    // 데이터베이스에 메시지 저장
    const message = await prisma.message.create({
        data: {
            roomId: data.roomId,
            senderId: data.senderId,
            content: data.content,
            type: data.type || "text",
        },
    });

    return message;
}

/**
 * 메시지 히스토리 조회
 */
export async function getMessageHistory(
    roomId: string,
    limit: number = 50,
    before?: string
) {
    const messages = await prisma.message.findMany({
        where: {
            roomId,
            ...(before && { id: { lt: before } }),
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true,
                },
            },
        },
    });

    return messages.reverse(); // 오래된 순서로 정렬
}

/**
 * 메시지 읽음 처리
 */
export async function markMessageAsRead(messageId: string, userId: string) {
    await prisma.messageRead.create({
        data: {
            messageId,
            userId,
            readAt: new Date(),
        },
    });
}
```

## 4. 클라이언트 구현 (React Native)

### 4.1 Socket 연결 설정

```typescript
// hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/stores/authStore";

const SOCKET_URL =
    process.env.EXPO_PUBLIC_SOCKET_URL || "http://localhost:3000";

export function useSocket(namespace: string = "/chat") {
    const socketRef = useRef<Socket | null>(null);
    const { token } = useAuthStore();

    useEffect(() => {
        if (!token) return;

        // Socket 연결
        const socket = io(`${SOCKET_URL}${namespace}`, {
            auth: {
                token,
            },
            transports: ["websocket"],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        });

        socketRef.current = socket;

        // 연결 이벤트
        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        socket.on("error", (error) => {
            console.error("Socket error:", error);
        });

        // 정리
        return () => {
            socket.disconnect();
        };
    }, [token, namespace]);

    return socketRef.current;
}
```

### 4.2 채팅방 훅

```typescript
// hooks/useChatRoom.ts
import { useState, useEffect, useCallback } from "react";
import { useSocket } from "./useSocket";
import type { Message } from "@/types/chat";

interface UseChatRoomOptions {
    roomId: string;
    namespace?: string;
}

export function useChatRoom({
    roomId,
    namespace = "/chat",
}: UseChatRoomOptions) {
    const socket = useSocket(namespace);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    // 채팅방 입장
    useEffect(() => {
        if (!socket || !roomId) return;

        socket.emit("join-room", { roomId });
        setIsConnected(true);

        // 메시지 수신
        socket.on("message", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        // 메시지 히스토리 수신
        socket.on("message-history", ({ messages: history }) => {
            setMessages(history);
        });

        // 타이핑 인디케이터
        socket.on("user-typing", () => {
            setIsTyping(true);
        });

        socket.on("user-stopped-typing", () => {
            setIsTyping(false);
        });

        // 정리
        return () => {
            socket.emit("leave-room", { roomId });
            socket.off("message");
            socket.off("message-history");
            socket.off("user-typing");
            socket.off("user-stopped-typing");
        };
    }, [socket, roomId]);

    // 메시지 전송
    const sendMessage = useCallback(
        (content: string, type: string = "text") => {
            if (!socket) return;

            socket.emit("send-message", { roomId, content, type });
        },
        [socket, roomId]
    );

    // 타이핑 시작
    const startTyping = useCallback(() => {
        if (!socket) return;
        socket.emit("typing-start", { roomId });
    }, [socket, roomId]);

    // 타이핑 중지
    const stopTyping = useCallback(() => {
        if (!socket) return;
        socket.emit("typing-stop", { roomId });
    }, [socket, roomId]);

    // 메시지 읽음 처리
    const markAsRead = useCallback(
        (messageId: string) => {
            if (!socket) return;
            socket.emit("mark-read", { roomId, messageId });
        },
        [socket, roomId]
    );

    return {
        messages,
        isTyping,
        isConnected,
        sendMessage,
        startTyping,
        stopTyping,
        markAsRead,
    };
}
```

### 4.3 채팅 화면 컴포넌트

```typescript
// components/ChatScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useChatRoom } from "@/hooks/useChatRoom";
import { MessageBubble } from "./MessageBubble";

interface ChatScreenProps {
    roomId: string;
    namespace?: string;
}

export function ChatScreen({ roomId, namespace }: ChatScreenProps) {
    const [input, setInput] = useState("");
    const typingTimeoutRef = useRef<NodeJS.Timeout>();
    const flatListRef = useRef<FlatList>(null);

    const {
        messages,
        isTyping,
        sendMessage,
        startTyping,
        stopTyping,
        markAsRead,
    } = useChatRoom({ roomId, namespace });

    // 메시지 입력 시 타이핑 인디케이터
    const handleInputChange = (text: string) => {
        setInput(text);

        if (text.length > 0) {
            startTyping();

            // 3초 후 타이핑 중지
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                stopTyping();
            }, 3000);
        } else {
            stopTyping();
        }
    };

    // 메시지 전송
    const handleSend = () => {
        if (input.trim()) {
            sendMessage(input.trim());
            setInput("");
            stopTyping();
        }
    };

    // 새 메시지가 올 때 스크롤
    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MessageBubble
                        message={item}
                        onRead={() => markAsRead(item.id)}
                    />
                )}
                ListFooterComponent={isTyping ? <TypingIndicator /> : null}
            />

            <View style={{ flexDirection: "row", padding: 10 }}>
                <TextInput
                    value={input}
                    onChangeText={handleInputChange}
                    placeholder="메시지를 입력하세요"
                    style={{ flex: 1, borderWidth: 1, padding: 10 }}
                />
                <TouchableOpacity onPress={handleSend}>
                    <Text>전송</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
```

## 5. 데이터베이스 스키마

### 5.1 메시지 테이블

```prisma
// schema.prisma

model Message {
  id        String   @id @default(cuid())
  roomId   String
  senderId String
  content  String
  type     String   @default("text") // text, image, file 등
  createdAt DateTime @default(now())

  sender   User     @relation(fields: [senderId], references: [id])
  reads    MessageRead[]

  @@index([roomId])
  @@index([createdAt])
}

model MessageRead {
  id        String   @id @default(cuid())
  messageId String
  userId    String
  readAt    DateTime @default(now())

  message  Message  @relation(fields: [messageId], references: [id])

  @@unique([messageId, userId])
  @@index([userId])
}

model ChatRoom {
  id        String   @id @default(cuid())
  roomId   String   @unique
  type     String   // "chat" | "property-inquiry"
  propertyId String? // 매물 문의인 경우
  participants String[] // 참여자 ID 배열
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([roomId])
}
```

## 6. 보안 고려사항

### 6.1 인증 및 권한

-   모든 Socket 연결은 JWT 토큰으로 인증
-   Room 입장 시 권한 확인
-   메시지 전송 시 발신자 확인

### 6.2 입력 검증

-   메시지 내용 길이 제한
-   XSS 방지를 위한 입력 검증
-   파일 업로드 시 크기 및 타입 제한

### 6.3 Rate Limiting

-   메시지 전송 빈도 제한
-   타이핑 이벤트 빈도 제한
-   DDoS 공격 방지

## 7. 성능 최적화

### 7.1 메시지 히스토리

-   초기 로드 시 최근 50개만 로드
-   무한 스크롤로 과거 메시지 로드
-   메시지 캐싱

### 7.2 연결 관리

-   앱이 백그라운드일 때 연결 유지
-   재연결 로직 구현
-   연결 상태 모니터링

### 7.3 알림 최적화

-   채팅방에 있을 때는 푸시 알림 미전송
-   읽지 않은 메시지 수 관리
-   배치 알림 처리

## 8. 개선 사항 및 고급 기능

### 8.1 읽지 않은 메시지 수 관리

#### 서버 구현

```typescript
// 읽지 않은 메시지 수 조회
socket.on("get-unread-count", async ({ roomId }) => {
    try {
        const unreadCount = await getUnreadMessageCount(roomId, userId);
        socket.emit("unread-count", { roomId, count: unreadCount });
    } catch (error) {
        socket.emit("error", { message: "Failed to get unread count" });
    }
});

// 모든 채팅방의 읽지 않은 메시지 수 조회
socket.on("get-all-unread-counts", async () => {
    try {
        const counts = await getAllUnreadMessageCounts(userId);
        socket.emit("all-unread-counts", counts);
    } catch (error) {
        socket.emit("error", { message: "Failed to get unread counts" });
    }
});

// 메시지 전송 시 읽지 않은 메시지 수 업데이트
async function sendMessage(roomId, senderId, content) {
    const message = await saveMessage({ roomId, senderId, content });

    // 상대방의 읽지 않은 메시지 수 증가
    const otherUserId = getOtherUserId(roomId, senderId);
    await incrementUnreadCount(roomId, otherUserId);

    // 상대방에게 읽지 않은 메시지 수 전송
    socket.to(`user:${otherUserId}`).emit("unread-count-updated", {
        roomId,
        count: await getUnreadMessageCount(roomId, otherUserId),
    });
}
```

### 8.2 채팅방 목록 조회

#### 서버 구현

```typescript
// 채팅방 목록 조회
socket.on("get-rooms", async () => {
    try {
        const rooms = await getUserChatRooms(userId);
        socket.emit("rooms", rooms);
    } catch (error) {
        socket.emit("error", { message: "Failed to get rooms" });
    }
});

// 채팅방 정보 조회
socket.on("get-room-info", async ({ roomId }) => {
    try {
        const hasAccess = await checkRoomAccess(userId, roomId);
        if (!hasAccess) {
            socket.emit("error", { message: "Access denied" });
            return;
        }

        const roomInfo = await getRoomInfo(roomId);
        socket.emit("room-info", roomInfo);
    } catch (error) {
        socket.emit("error", { message: "Failed to get room info" });
    }
});
```

### 8.3 메시지 삭제 및 수정

#### 서버 구현

```typescript
// 메시지 삭제
socket.on("delete-message", async ({ roomId, messageId }) => {
    try {
        const message = await getMessage(messageId);

        // 권한 확인: 발신자만 삭제 가능
        if (message.senderId !== userId) {
            socket.emit("error", { message: "Permission denied" });
            return;
        }

        await deleteMessage(messageId);

        // 같은 방의 다른 사용자에게 삭제 알림
        socket.to(roomId).emit("message-deleted", { roomId, messageId });
        socket.emit("message-deleted", { roomId, messageId });
    } catch (error) {
        socket.emit("error", { message: "Failed to delete message" });
    }
});

// 메시지 수정
socket.on("edit-message", async ({ roomId, messageId, content }) => {
    try {
        const message = await getMessage(messageId);

        // 권한 확인: 발신자만 수정 가능
        if (message.senderId !== userId) {
            socket.emit("error", { message: "Permission denied" });
            return;
        }

        const updatedMessage = await updateMessage(messageId, content);

        // 같은 방의 다른 사용자에게 수정 알림
        socket.to(roomId).emit("message-edited", updatedMessage);
        socket.emit("message-edited", updatedMessage);
    } catch (error) {
        socket.emit("error", { message: "Failed to edit message" });
    }
});
```

### 8.4 메시지 전송 확인 (Acknowledgment)

#### 서버 구현

```typescript
// 메시지 전송 시 acknowledgment 사용
socket.on("send-message", async ({ roomId, content, type }, callback) => {
    try {
        const hasAccess = await checkRoomAccess(userId, roomId);
        if (!hasAccess) {
            callback({ success: false, error: "Access denied" });
            return;
        }

        const message = await saveMessage({
            roomId,
            senderId: userId,
            content,
            type,
        });

        socket.to(roomId).emit("message", message);

        // 성공 응답
        callback({ success: true, messageId: message.id });
    } catch (error) {
        callback({ success: false, error: "Failed to send message" });
    }
});
```

#### 클라이언트 구현

```typescript
// 메시지 전송 시 확인 대기
const sendMessage = (content: string) => {
    socket.emit("send-message", { roomId, content }, (response) => {
        if (response.success) {
            console.log("Message sent:", response.messageId);
        } else {
            console.error("Failed to send:", response.error);
            // 재시도 로직
        }
    });
};
```

### 8.5 오프라인 메시지 큐잉

#### 서버 구현

```typescript
// 메시지 전송 시 상대방이 오프라인인지 확인
async function sendMessage(roomId, senderId, content) {
    const message = await saveMessage({ roomId, senderId, content });
    const otherUserId = getOtherUserId(roomId, senderId);

    // 상대방이 온라인인지 확인
    const isOnline = await checkUserOnline(otherUserId);

    if (isOnline) {
        // 온라인: 실시간 전송
        socket.to(roomId).emit("message", message);
    } else {
        // 오프라인: 큐에 저장 (나중에 전송)
        await queueOfflineMessage(roomId, otherUserId, message);
    }
}

// 사용자가 온라인 상태가 되면 큐에 있는 메시지 전송
socket.on("connection", async (socket) => {
    const userId = socket.data.user.id;

    // 오프라인 메시지 전송
    const offlineMessages = await getOfflineMessages(userId);
    if (offlineMessages.length > 0) {
        socket.emit("offline-messages", offlineMessages);
        await clearOfflineMessages(userId);
    }
});
```

### 8.6 Rate Limiting 구현

#### 서버 구현

```typescript
import rateLimit from "express-rate-limit";
import { RateLimiterMemory } from "rate-limiter-flexible";

// 메시지 전송 Rate Limiter
const messageLimiter = new RateLimiterMemory({
    points: 10, // 10개 메시지
    duration: 60, // 1분 동안
});

// 타이핑 이벤트 Rate Limiter
const typingLimiter = new RateLimiterMemory({
    points: 20, // 20개 이벤트
    duration: 60, // 1분 동안
});

socket.on("send-message", async ({ roomId, content }, callback) => {
    try {
        // Rate limit 확인
        await messageLimiter.consume(userId);

        // 메시지 전송 로직
        // ...
    } catch (error) {
        if (error.msBeforeNext) {
            callback({
                success: false,
                error: "Rate limit exceeded",
                retryAfter: Math.ceil(error.msBeforeNext / 1000),
            });
        }
    }
});
```

### 8.7 Redis를 이용한 세션 관리 (스케일링)

#### 서버 구현

```typescript
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

// Redis 클라이언트 생성
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

// Socket.io에 Redis 어댑터 설정 (다중 서버 지원)
io.adapter(createAdapter(pubClient, subClient));

// 사용자 온라인 상태 관리
async function setUserOnline(userId: string, socketId: string) {
    await pubClient.set(`user:${userId}:socket`, socketId);
    await pubClient.sAdd("online-users", userId);
}

async function setUserOffline(userId: string) {
    await pubClient.del(`user:${userId}:socket`);
    await pubClient.sRem("online-users", userId);
}

async function checkUserOnline(userId: string): Promise<boolean> {
    return await pubClient.sIsMember("online-users", userId);
}
```

### 8.8 이미지/파일 전송 처리

#### 서버 구현

```typescript
// 이미지/파일 전송
socket.on("send-message", async ({ roomId, content, type, fileUrl }) => {
    try {
        // 파일 타입 검증
        if (type === "image" || type === "file") {
            if (!fileUrl) {
                socket.emit("error", { message: "File URL required" });
                return;
            }

            // 파일 크기 및 타입 검증
            const fileInfo = await validateFile(fileUrl);
            if (!fileInfo.valid) {
                socket.emit("error", { message: "Invalid file" });
                return;
            }
        }

        const message = await saveMessage({
            roomId,
            senderId: userId,
            content,
            type,
            fileUrl,
        });

        socket.to(roomId).emit("message", message);
    } catch (error) {
        socket.emit("error", { message: "Failed to send message" });
    }
});
```

### 8.9 메시지 검색 기능

#### 서버 구현

```typescript
// 메시지 검색
socket.on("search-messages", async ({ roomId, query, limit = 20 }) => {
    try {
        const hasAccess = await checkRoomAccess(userId, roomId);
        if (!hasAccess) {
            socket.emit("error", { message: "Access denied" });
            return;
        }

        const messages = await searchMessages(roomId, query, limit);
        socket.emit("search-results", { roomId, messages });
    } catch (error) {
        socket.emit("error", { message: "Failed to search messages" });
    }
});
```

### 8.10 채팅방 나가기 및 차단 기능

#### 서버 구현

```typescript
// 채팅방 나가기
socket.on("leave-room-permanently", async ({ roomId }) => {
    try {
        await markRoomAsLeft(roomId, userId);
        socket.leave(roomId);
        socket.emit("room-left", { roomId });
    } catch (error) {
        socket.emit("error", { message: "Failed to leave room" });
    }
});

// 사용자 차단
socket.on("block-user", async ({ blockedUserId }) => {
    try {
        await blockUser(userId, blockedUserId);
        socket.emit("user-blocked", { userId: blockedUserId });
    } catch (error) {
        socket.emit("error", { message: "Failed to block user" });
    }
});
```

### 8.11 에러 핸들링 개선

#### 서버 구현

```typescript
// 에러 타입 정의
enum ErrorCode {
    AUTHENTICATION_ERROR = "AUTH_ERROR",
    AUTHORIZATION_ERROR = "AUTHZ_ERROR",
    RATE_LIMIT_ERROR = "RATE_LIMIT",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND_ERROR = "NOT_FOUND",
    INTERNAL_ERROR = "INTERNAL_ERROR",
}

// 에러 핸들러
function handleError(socket: Socket, error: Error, code: ErrorCode) {
    console.error(`[${code}]`, error);

    socket.emit("error", {
        code,
        message: error.message,
        timestamp: new Date().toISOString(),
    });
}

// 사용 예시
socket.on("send-message", async ({ roomId, content }) => {
    try {
        // 로직
    } catch (error) {
        if (error instanceof AuthenticationError) {
            handleError(socket, error, ErrorCode.AUTHENTICATION_ERROR);
        } else if (error instanceof RateLimitError) {
            handleError(socket, error, ErrorCode.RATE_LIMIT_ERROR);
        } else {
            handleError(socket, error, ErrorCode.INTERNAL_ERROR);
        }
    }
});
```

### 8.12 배치 메시지 전송

#### 서버 구현

```typescript
// 여러 메시지를 한 번에 전송 (예: 템플릿 메시지)
socket.on("send-batch-messages", async ({ roomId, messages }) => {
    try {
        const savedMessages = await Promise.all(
            messages.map((msg) =>
                saveMessage({
                    roomId,
                    senderId: userId,
                    content: msg.content,
                    type: msg.type,
                })
            )
        );

        // 배치로 전송
        socket.to(roomId).emit("batch-messages", savedMessages);
        socket.emit("batch-messages", savedMessages);
    } catch (error) {
        socket.emit("error", { message: "Failed to send batch messages" });
    }
});
```

## 9. 테스트

### 9.1 단위 테스트

-   Room ID 생성 함수 테스트
-   권한 확인 함수 테스트
-   메시지 저장 함수 테스트
-   Rate limiting 테스트

### 9.2 통합 테스트

-   Socket 연결 테스트
-   메시지 전송/수신 테스트
-   타이핑 인디케이터 테스트
-   읽지 않은 메시지 수 테스트
-   오프라인 메시지 큐잉 테스트

### 9.3 E2E 테스트

-   전체 채팅 플로우 테스트
-   다중 사용자 채팅 테스트
-   네트워크 오류 처리 테스트
-   재연결 시 메시지 동기화 테스트

---

**작성일**: 2024년
**버전**: 1.1
**업데이트**: 프로젝트 진행에 따라 지속적으로 업데이트
