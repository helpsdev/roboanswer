const MyResume = require('./resume.json');

module.exports = function (controller) {
    
    controller.hears(Object.keys(MyResume),"message", async (bot, message) => {
        await bot.reply(message, {
            text: "I think you're interested in one of these would you help me pointing in the rigth direction?",
            quick_replies: Object.keys(MyResume[message.text]).map(e => {
                return {
                    title: e,
                    payload: e
                };
            })
        });
    });

}