const MyResume = require('./resume.json');

module.exports = function (controller) {
    
    controller.hears(Object.keys(MyResume),"message", async (bot, message) => {
        const areaOfInterestObj = MyResume[message.text];

        if (Array.isArray(areaOfInterestObj)) {
            
            let detailResponse;
            switch (message.text) {
                case "work":
                    detailResponse = "places I've worked on: ";
                    break;
                case "volunteer":
                    detailResponse = "volunteer I've been part of: ";
                    break;
                default:
                    break;
            }

            await bot.reply(message, "This are the " + detailResponse);
            for (elem of areaOfInterestObj){
                const firstPropName = Object.keys(elem)[0];
                await bot.reply(message, `${firstPropName}: ${elem[firstPropName]}`);
            }

        }else{
            await bot.reply(message, {
                text: "I think you're interested in one of these would you help me pointing in the rigth direction?",
                quick_replies: Object.keys(areaOfInterestObj).map(toQuickReply)
            });
        }
    });

}

function toQuickReply(propName){
    return{
        title: propName,
        payload: propName
    };
}