import bridge from "@vkontakte/vk-bridge";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64"

const generateHash = (payload = "") => {
    return new Promise((resolve) => {
        bridge
            .send("VKWebAppCreateHash", {
                payload,
            })
            .then((data) => {
                console.info(`[generateHash()] ${JSON.stringify(data)}`);

                const hmac = Base64.stringify(
                    hmacSHA512(
                        `${
                            window.location.href
                                .slice(window.location.href.indexOf("?") + 1)
                                .split("#")[0]
                        }-${data.sign.slice(0, 5)}-${data.ts}`,
                        data.sign
                    )
                );

                resolve({
                    hash: data.sign,
                    hmac,
                    ts: data.ts,
                });
            });
    });
};

export default generateHash