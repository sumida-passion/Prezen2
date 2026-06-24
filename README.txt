Prezen2 no-iframe版です。

このZIPの中身を GitHub の Prezen2 フォルダ直下にアップロードしてください。
同じフォルダに以下がある前提です。
- tankyu2.html
- syokai2.html
- hpmain.jpg（タイトル背景。なくても起動します）

重要：今回はTankyu2をiframeの中に入れません。
タイトル画面 → tankyu2.html に普通に移動します。
そのためTankyu2本体のタップ操作・スライド動作を邪魔しにくいです。

接続方法：
sw.js が tankyu2.html を読み込む時に、最後のページだけ「学校紹介へ」ボタンを自動追加します。
また、Tankyu2内の最後のリンクが奈良文化HPやsyokai系リンクの場合、syokai2.htmlへ差し替えて移動します。

初回だけ service worker の反映で再読み込みされることがあります。
うまく反映しない場合は、ブラウザで1回更新してから使ってください。
