class SpreadSheet {
    constructor(sheet_name) {
        const sheets = SpreadsheetApp.getActiveSpreadsheet();
        this._sheet_range = sheets.getSheetByName(sheet_name).getDataRange();
        this.data = this._sheet_range.getValues();
    }

    get_last_cal_time() {
        const time = this.data[0][1];
        return time;
    }

    get_notice_day() {
        const warning_day = this.data[1][1];
        const exe_day = this.data[2][1];
        return warning_day, exe_day;
    }

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

    get_warning_ads() {
        return this._get_two_column(4);
    }

    get_exe_ads() {
        return this._get_two_column(7);
    }
}


const get_document = (url) => {
    const doc = DocumentApp.openByUrl(url);
    const header = doc.getHeader().getText();
    const text = doc.getBody().getText();
    return header, text;
};
