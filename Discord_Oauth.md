# Discord OAuth2
1. OAuth2 URL Generatorのurlにアクセスさせる
2. redirect urlに'?code='が付いた状態で飛ばされる
3. codeを使って、以下のコードをpsで叩く
  ```ps
  curl -X POST -H "Content-Type:application/x-www-form-urlencoded" -d "client_id=CLIENT ID&client_secret=CLIENT SECRET&grant_type=authorization_code&code=コード&redirect_uri=リダイレクト先（認証URLのものと同一である必要あり）" https://discordapp.com/api/oauth2/token
  ```
4. 返ってくるjsonのaccess tokenを取得
5. 以下の文字列をpsで叩く
  ```ps
  curl -H "Authorization: Bearer アクセストークン" https://discordapp.com/api/users/@me
  ```

- refresh token使ったらまたaccess token手に入って再度APIたたけるようになる
curl -X POST -H "Content-Type:application/x-www-form-urlencoded" -d "client_id=CLIENT ID&client_secret=CLIENT SECRET&grant_type=refresh_token&refresh_token=リフレッシュトークン" https://discordapp.com/api/oauth2/token
