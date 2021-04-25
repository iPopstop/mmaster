# Установка
- Создать бота и пригласить его в канал в дискорде
- Создать группу ВКонтакте, включить Longpoll, а также создать токен для работы с сообщениями
- Запустить `npm install`
- Настроить config.json:
    - Discord 
        - Webhook - данные из ссылки на webhook сервера (часть цифр до / - `id`, данные после / - `token`)
            - Например: https://discord.com/api/webhooks/ `8358154683373322` / `Txkjb7XN-CkKxNYaN7RnhSRYWpL-BZgMLF5yL_cTrRaAUIeiT5p1bQEOnMENG4va8i`
        - Bot - token - токен бота
    - VK
        - peer_id - ID беседы
        - token - токен группы (с правами доступа к сообщениям)
- Запустить с помощью `node index.js`

Проверить не разворачивая можно здесь:
- ВК - https://vk.me/join/AJQ1d1htjBsIX3_eEK7ZYq_m 
- Discord - https://discord.gg/mqBxg2Wp