const MODE = "main";
// const MODE = "debug";


const record_cal_time = () => {
    const now = new Date();
    const spreadsheet = SpreadSheet(MODE);
    spreadsheet.set_last_cal_time(now);
};


const checker = () => {
    const now = new Date();
    const spreadsheet = SpreadSheet(MODE);
    const last_cal_time = spreadsheet.get_last_cal_time(now);
    const [warning_day, exe_day] = spreadsheet.get_notice_day();
    const send_each_mail = (ads) => {
        for (const ad of ads) {
            const [address, url] = ad;
            const [header, text] = get_document(url);
            MailApp.sendEmail(address, header, text);
        }
    };
    if (now.getTime() > last_cal_time.getTime() + exe_day * 24 * 60 * 60 * 1000) {
        const ads = spreadsheet.get_exe_ads();
        send_each_mail(ads);
    } else if (now.getTime() > last_cal_time.getTime() + warning_day * 24 * 60 * 60 * 1000){
        const ads = spreadsheet.get_warning_ads();
        send_each_mail(ads);
    }
};
