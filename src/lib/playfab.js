import * as PlayFab from "playfab-sdk";

PlayFab.settings.titleId = "DF4A8";

export const loginWithCustomID = async (customId) => {
    return new Promise((resolve, reject) => {
        PlayFab.Client.LoginWithCustomID({
            TitleId: PlayFab.settings.titleId,
            CustomId: customId,
            CreateAccount: true
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result.data);
        });
    });
};
