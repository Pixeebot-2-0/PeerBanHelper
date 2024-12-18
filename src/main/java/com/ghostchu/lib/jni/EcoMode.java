package com.ghostchu.lib.jni;

import com.ghostchu.peerbanhelper.Main;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Locale;

@Slf4j
@Component
public class EcoMode {

    public boolean ecoMode(boolean enable) {
        String os = System.getProperty("os.name").toLowerCase(Locale.ROOT);
        if (!os.startsWith("win")) {
            throw new IllegalStateException("Only Windows OS support EcoMode API");
        }
        String arch = System.getProperty("os.arch").toLowerCase(Locale.ROOT);
        try {
            File tmpFile = Files.createTempFile("pbh-jni-lib", ".dll").toFile();
            tmpFile.deleteOnExit();
            if (arch.contains("aarch64")) {
                Files.copy(Main.class.getResourceAsStream("/native/windows/ghost-common-jni_vc2015_aarch64.dll"), tmpFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            } else {
                Files.copy(Main.class.getResourceAsStream("/native/windows/ghost-common-jni_vc2015_amd64.dll"), tmpFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            }
            System.load(tmpFile.getAbsolutePath());
        } catch (Exception e) {
            log.error("Unable load JNI native libraries", e);
        }
        try {
            String data = setEcoMode(enable);
            return "SUCCESS".equals(data);
        } catch (Throwable e) {
            return false;
        }
    }

    private native static String setEcoMode(boolean enable);
}
