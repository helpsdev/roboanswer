const { BotkitConversation } = require("botkit");
const MyResume = require('./resume.json');
const GREETING_DIALOG = "greeting_dialog";
const ValidResumeSections = [
    "work",
    "education",
    "publications",
    "skills",
    "languages"
]


module.exports = function (controller) {

    let greetingDialog = new BotkitConversation(GREETING_DIALOG, controller);
    
    greetingDialog.say("Hi I'm Edwin's digital representation");
    greetingDialog.say("I'm here to help you know me better.");
    greetingDialog.say("The first thing you need to know about me is that I'm open for work!");
    greetingDialog.say("If you're a recruiter I encourage you to ask me things you want to know about me");
    greetingDialog.say({
        text: "Here are some topics to help you brake the ice 😉",
        quick_replies: getCoreSections()
    });



    controller.addDialog(greetingDialog);
    controller.on('hello,welcome_back', async(bot, message) => {
        await bot.beginDialog(GREETING_DIALOG);
    });

}

function getCoreSections(){
    return [
        "Job History",
        "Education",
        "Tech Stack",
        "Contact Information"
    ].map(toQuickReply);
}

function toQuickReply(element){
    return {
        title : element,
        payload : element
    }
}

function getResumeMainSections(){
    return Object.keys(MyResume)
    .filter(key => ValidResumeSections.indexOf(key) > -1)
    .map(toQuickReply);
}