class SpreadSheet {
    constructor(sheet_name) {
        const sheets = SpreadsheetApp.getActiveSpreadsheet();
        this._sheet_range = sheets.getSheetByName(sheet_name).getDataRange();
        this.data = this._sheet_range.getValues();
    }

    // カレンダーに最後にアクセスした時間を取得
    get_last_cal_time() {
        const time = this.data[0][1];
        return time;
    }

    // ダイイングメッセージ，警告メールが何日後に出るかを取得
    get_notice_day() {
        const warning_day = this.data[1][1];  // 警告メールが出る日
        const exe_day = this.data[2][1];  // ダイイングが出る日
        return warning_day, exe_day;
    }

    // カレンダーに最後にアクセスした時間を更新
    set_last_cal_time(time) {
        this.data[0][1] = time;
        this._sheet_range.setValues(this.data);
    }

    _get_two_column(index) {
        let column = [];
        for (let i = 0; i < this.data.length; i++) {
            const one = this.data[i][index];
            const two = this.data[i][index+1];
            if (one) {
                column.push([one, two]);
            }
        }
        return column;
    }

    // 警告メールを送るアドレスとメッセージを示すurlを組として，そのリストを返す
    get_warning_ads() {
        return this._get_two_column(4);
    }

    // ダイイングメッセージを送るアドレスとメッセージを示すurlを組として，そのリストを返す
    get_exe_ads() {
        return this._get_two_column(7);
    }
}

// Google ドキュメントからメールで送るメッセージを取得
const get_document = (url) => {
    const doc = DocumentApp.openByUrl(url);
    const header = doc.getHeader().getText();  // ヘッダーがタイトル
    const text = doc.getBody().getText();  // 中身が本文
    return header, text;
};



// トリガー削除関数
const trigger_del = (funcname) => {
    const triggers = ScriptApp.getProjectTriggers();
    for (const trigger of triggers) {
        if (trigger.getHandlerFunction() == funcname) {
            ScriptApp.deleteTrigger(trigger);
        }
    }
};
