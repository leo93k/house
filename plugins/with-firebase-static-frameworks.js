const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

module.exports = function withFirebaseStaticFrameworks(config) {
    return withDangerousMod(config, [
        "ios",
        async (cfg) => {
            const podfile = path.join(
                cfg.modRequest.projectRoot,
                "ios",
                "Podfile"
            );

            if (!fs.existsSync(podfile)) {
                return cfg;
            }

            let podfileContent = fs.readFileSync(podfile, "utf8");

            // 1. use_modular_headers! 추가 (없는 경우만)
            if (!podfileContent.includes("use_modular_headers!")) {
                podfileContent = podfileContent.replace(
                    /(platform\s*:ios[^\n]*\n)/,
                    `$1use_modular_headers!\n`
                );
            }

            // 2. post_install에 Firebase 설정 추가
            const firebasePostInstallCode = `    
    # Fix for Firebase with static frameworks - enable modular headers for React-Core
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Enable modular headers for React-Core and related pods
        if target.name.start_with?('React-Core') || target.name.start_with?('React-') || target.name == 'React'
          config.build_settings['DEFINES_MODULE'] = 'YES'
          config.build_settings['CLANG_ENABLE_MODULES'] = 'YES'
        end
        
        # Fix for Firebase pods
        if target.name.start_with?('RNFB') || target.name.start_with?('Firebase')
          config.build_settings['DEFINES_MODULE'] = 'YES'
          config.build_settings['CLANG_ENABLE_MODULES'] = 'YES'
          # Allow non-modular includes in framework modules for Firebase
          config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
        end
      end
    end`;

            // post_install 블록이 있는지 확인하고 추가
            if (podfileContent.includes("post_install do |installer|")) {
                // 이미 post_install이 있으면, react_native_post_install 호출 후에 추가
                if (
                    !podfileContent.includes(
                        "CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES"
                    )
                ) {
                    // react_native_post_install 호출 후에 추가
                    // react_native_post_install(...) 블록의 닫는 괄호 다음 줄에 추가
                    const lines = podfileContent.split("\n");
                    let insertIndex = -1;
                    let inReactNativePostInstall = false;
                    let parenDepth = 0;

                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];

                        if (line.includes("react_native_post_install")) {
                            inReactNativePostInstall = true;
                            // 열린 괄호 개수 세기
                            for (const char of line) {
                                if (char === "(") parenDepth++;
                                if (char === ")") parenDepth--;
                            }
                        } else if (inReactNativePostInstall) {
                            // 괄호 깊이 추적
                            for (const char of line) {
                                if (char === "(") parenDepth++;
                                if (char === ")") parenDepth--;
                            }
                            // 모든 괄호가 닫혔으면 그 다음 줄에 추가
                            if (parenDepth === 0) {
                                insertIndex = i + 1;
                                break;
                            }
                        }
                    }

                    if (insertIndex !== -1) {
                        // insertIndex 위치에 Firebase 설정 추가
                        lines.splice(insertIndex, 0, firebasePostInstallCode);
                        podfileContent = lines.join("\n");
                    }
                }
            }

            fs.writeFileSync(podfile, podfileContent);
            return cfg;
        },
    ]);
};
