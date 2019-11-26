import * as functions from 'firebase-functions';
import * as request from 'request';

export const helloWorld = functions.https.onRequest((req, response) => {
 response.send("Hello from Firebase!");
});

export const set_admin_right = functions.https.onRequest(async(req, res) => {
    console.log('set_admin_right-----> ', req.body)
    const data: any = {
        chat_id: +req.body.channel_id,
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
    request(
    {
        url: 'https://api.telegram.org/bot581251518:AAE-lXYjU6tR9_G9ej2Q9jqTDMjBtNi-po8/promoteChatMember',
        // https://api.telegram.org/bot581251518:AAE-lXYjU6tR9_G9ej2Q9jqTDMjBtNi-po8/promoteChatMember?chat_id=@programirs&user_id=741077535&can_change_info=false&can_post_messages=false&can_edit_messages=false&can_delete_messages=false&can_invite_users=false&can_restrict_members=true&can_pin_messages=false&can_promote_members=false
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify(data)
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
    })
    
});

export const task_is_finished = functions.https.onRequest(async(req, res) => {
    res.send({text: 'Task is finished ', data: req.body})
});
