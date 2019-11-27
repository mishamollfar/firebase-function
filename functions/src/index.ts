import * as functions from 'firebase-functions';
import * as request from 'request';
import * as telegraf from 'telegraf';

export const helloWorld = functions.https.onRequest((req, response) => {
 response.send("Hello from Firebase!");
});

export const set_admin_right = functions.https.onRequest(async(req, res) => {
    console.log('set_admin_right-----> ', req.body)
    const data: any = {
        chat_id: '@' + req.body.channel_link,
        user_id: +req.body.zombie_id,
        can_change_info: false,
        can_post_messages: false,
        can_edit_messages: false,
        can_delete_messages: false,
        can_invite_users: false,
        can_restrict_members: true,
        can_pin_messages: false,
        can_promote_members: false,
    };
    const apiUrl = 'https://api.telegram.org/bot581251518:AAE-lXYjU6tR9_G9ej2Q9jqTDMjBtNi-po8/promoteChatMember';
    const bodyData =  Object.keys(data).map(item => `${item}=${data[item]}`).join('&');
    request(
        {
            url: apiUrl,
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded, application/json'},
            body: bodyData
        },
        (error, response, body) => {
            console.log('error--------------> ', error)
            console.log('response--------------> ', response)
            console.log('body--------------> ', body)
            if (error) {
                res.status(500).send({
                    code: 'error',
                    error: error
                })
            }

            res.status(200).send({
                code: 'ok',
                response: response
            })
        }
    )
});

export const restrictChatMember = functions.https.onRequest(async(req, res) => {
    console.log('restrictChatMember-----> ', req.body)
    const api = new telegraf.Telegram('581251518:AAE-lXYjU6tR9_G9ej2Q9jqTDMjBtNi-po8')
    const chatId = '@' + req.body.channel_link;

    api.restrictChatMember(chatId, req.body.zombie_id, {can_send_messages: true, can_send_media_messages: true, can_send_other_messages: true})
        .then(response => {
            console.log('response--------------> ', response)
            res.status(200).send({
                code: 'ok',
                response: response
            })
        })
        .catch(error => {
            console.log('error--------------> ', error)
            res.status(500).send({
                code: 'error',
                error: error
            })
        })
});

export const task_is_finished = functions.https.onRequest(async(req, res) => {
    res.send({text: 'Task is finished ', data: req.body})
});
