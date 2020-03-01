# Dying Message Project

一定期間 Google Calender にアクセスしていない場合，時限メッセージを送信するGoogle Apps Script 製のスクリプト。

ダイイングメッセージとしての利用を想定。


## 設定方法

1. sample ディレクトリにある `.xlsx` ファイルと同じような Google Spreadsheet を用意する。
2. その Spreadsheet のコンテナバインド型スクリプトに src 以下のソースコードと `appscript.json` をコピーする。
3. sample ディレクトリにある `.docx` ファイルと同じような Google Document を作成し，そのファイルの URL を Spreadsheet の指定位置に記載
4. トリガーを立てる。record_cal_time 関数はカレンダー変更で発動するようにし， checker 関数は1日毎に発動するようにする。
