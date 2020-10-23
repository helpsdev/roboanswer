const MyResume = require('./resume.json');
const {BotkitConversation} = require("botkit");

module.exports = function (controller) {
    
    controller.hears(Object.keys(MyResume),"message", async (bot, message) => {
        const areaOfInterest = MyResume[message.text];

        if (Array.isArray(areaOfInterest)) {
            
            let detailResponse;
            switch (message.text) {
                case "work":
                    detailResponse = "places I've worked on: ";
                    break;
                case "education":
                    detailResponse = "education places I've studied on: ";
                    break;
                case "publications":
                    detailResponse = "digital publications I've wrote about: ";
                    break;
                case "skills":
                    detailResponse = "skills I count with: ";
                    break;
                case "languages":
                    detailResponse = "languages I speak: ";
                    break;
                default:
                    break;
            }

            await bot.reply(message, "These are the " + detailResponse);
            for (elem of areaOfInterest){
                const firstPropName = Object.keys(elem)[0];
                await bot.reply(message, `${firstPropName}: ${elem[firstPropName]}`);
            }

        }else{
            await bot.reply(message, {
                text: "I think you're interested in one of these would you help me pointing me in the rigth direction?",
                quick_replies: Object.keys(areaOfInterest).map(toQuickReply)
            });
        }
    });

    controller.hears("Job History", "message", async (bot, message) => {
        const jobHistory = MyResume.work;
        await bot.reply(message, {
            text: "I see you want to know about about my job history. Which job would you like to know more about?",
            quick_replies: jobHistory.map(j => j.name).map(toQuickReply)
        });
    });

    controller.hears("Education", "message", async (bot, message) => {
        
    });

    controller.hears("Tech Stack", "message", async (bot, message) => {
        
    });

    controller.hears("Contact Information", "message", async (bot, message) => {
        
    });

}

function toQuickReply(propName){
    return{
        title: propName,
        payload: propName
    };
}