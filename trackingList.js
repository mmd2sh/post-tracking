!function() {
    const thisScript = document.currentScript;
    const mbWrap = $(thisScript).closest('.mb-wrapper');

    const resualt = [ {{content}} ];
    
    $('.tracking-search-wrap .tracking-search-loading').hide();
    
    const submitBtn = $('input.drt-searchBtn[data-identifier*=search_]');
    submitBtn.prop('disabled', false);
    
    submitBtn.on('click', function() {
        window.isTrackingSubmitClicked = true;
    });
    
    const input = $('[data-dbfield=trackingCode]');
    
    const trackingCode = input.val();
    const inputId = input[0].id;
    
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get(inputId);
    
    let items = '';
    resualt.reverse().forEach(function(item) {
        items += `<tr PostnodeID="${item.PostnodeId}">
                    <td class="traching-date" tdate="${item.TDate}" tfdate="${item.TFDate}">${formatDate(item.TDate)}</td>
                    <td class="traching-describe">${item.Describe}</td>
                    <td class="traching-state">${item.State}</td>
                    <td class="traching-dtype">${DTypes(item.DType)}</td>
                    <td class="traching-type">${Types(item.Type)}</td>
                 </tr>`
    });
    
    const table = `<table>
                    <thead>
                        <tr>
                            <th>تاریخ</th>
                            <th>توضیحات</th>
                            <th>استان</th>
                            <th>نوع رویداد</th>
                            <th>نوع مرسوله</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items}
                    </tbody>
                </table>`;
                
    const dom = `<div class="post-tracking-modal">
                    <div class="uk-modal-header uk-flex uk-flex-space-between">
                        <h2 class="uk-modal-title uk-margin-remove">
                            رهگیری مرسوله به شماره :
                            ${trackingCode}
                        </h2>
                        <a class="uk-modal-close fal fa-times fa-2x uk-text-muted"></a>
                    </div>
                    <div class="uk-modal-body uk-text-center">
                        <div class="tracking-table-wrap">
                            ${table}
                        </div> 
                        <div class="uk-margin uk-text-center">
                            <a class="uk-button uk-button-primary uk-button-large" href="https://tracking.post.ir/?id=${trackingCode}" target="_blank">جزئیات بیشتر</a>
                        </div>
                    </div>
                </div>`;

    if (resualt[0].TDate) {
        const modal = UIkit.modal.blockUI(dom, {
            bgclose: true,
            keyboard: true,
            center: true,
        });
        
        modal.dialog.addClass('uk-modal-dialog-large');
    } else {
        
        if (typeof isTrackingSubmitClicked !== 'undefined') {
            
            const modal = UIkit.modal.blockUI(`
                <div class="tp-modal-no-result uk-alert uk-alert-warning uk-text-center">
                    <i class="fa fa-exclamation-triangle fa-3x"></i>
                    <h2>هیچ رکوردی یافت نشد</h2>
                </div>
            `, {
                bgclose: true,
                keyboard: true,
                center: true,
            });
        } 
    }
    
    if (codeParam) {
        
    }
    
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        
        const persianDateString = date.toLocaleDateString('fa-IR-u-ca-persian', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        var time = date.toLocaleTimeString('fa-IR');
        
        const [year, month, day, weekday] = persianDateString.split(' ');
        const customPersianDate = `${weekday} ${day} ${month} ${year} : ${time}`;
        
        return customPersianDate;
    }
    
    function Types(key) {
        return {
            1: 'وارده به نقطه مبادله',
            2: 'صادره از نقطه مبادله',
            3: 'ورود به توزیع',
            4: 'باجه معطله ',
        }[key] || key;
    }
    
    function DTypes(key) {
        return {
            '-1': 'بلاتکلیف ',
            '1': 'تحویل به موزع',
            '2': 'انصراف موزع',
            '3': 'تحویل مرسوله به گیرنده',
            '4': 'گیرنده فوت نموده است',
            '5': 'نشانی گیرنده شناخته نشد',
            '6': 'گیرنده شناخته نشد',
            '7': 'گیرنده از دریافت خودداري نمود',
            '8': 'گیرنده نقل مکان نموده است',
            '9': 'گیرنده در مسافرت',
            '10': 'مراجعه اول ',
            '11': 'مراجعه دوم ',
            '12': 'مراجعه سوم ',
            '13': 'سایر',
            '14': 'ورود مرسوله به منطقه (فیزیکی) ',
            '15': 'ممیزي صادره ',
            '16': 'تحویل به موزع (انبوه) ',
            '17': 'تبادلات داخلی - تحویل از ناحیه به ناحیه ',
            '18': 'ورود به باجه معطله ',
            '19': 'خروج از باجه معطله ',
            '20': 'تحویل به گیرنده از باجه معطله ',
            '21': 'وقوع بی ترتیبی در ممیزي وارده ',
            '22': 'لغو ورود مرسوله به منطقه ',
            '23': 'لغو ورود مرسوله به منطقه با حذف ثبت ',
            '24': 'لغو خروج مرسوله از منطقه ',
            '25': 'لغو ورود مرسوله به منطقه با حذف ثبت ',
            '26': 'لغو ورود مرسوله به منطقه با حذف کیسه ',
            '27': 'ورود مرسوله به منطقه (ثبت) ',
            '28': 'لغو خروج مرسوله از منطقه با حذف کیسه ',
            '29': 'لغو تحویل مرسوله به ناحیه ',
            '30': 'قبول دریافت مرسوله از ناحیه ',
            '31': 'عدم قبول مرسوله و برگشت آن ',
            '32': 'انصراف موزع از توزیع انبوه ',
            '33': 'انصراف موزع از توزیع انبوه با حذف گروه انبوه ',
            '34': 'ممیزي وارده از طرف دفتر پستی',
            '35': 'ممیزي وارده از دفتر پستی ',
            '36': 'ورود مرسوله به منطقه از دفتر پستی (ثبت) ',
            '37': 'ورود مرسوله به منطقه از دفتر پستی (فیزیکی) ',
            '38': 'لغو ورود مرسوله به منطقه از دفتر پستی ',
            '39': 'لغو ورود مرسوله به منطقه با حذف دپش ',
            '40': 'لغو خروج مرسوله از منطقه با حذف دپش ',
            '41': 'تحویل به موزع - انبوه ',
            '42': 'تحویل مرسوله به صندوق شخصی ',
            '43': 'لغو تحویل مرسوله به صندوق شخصی ',
            '44': 'تحویل مرسوله به همکار ',
            '45': 'لغو تحویل مرسوله به همکار ',
            '46': 'ثبت ورود کیسه به منطقه ',
            '47': 'ثبت ورود کیسه به منطقه (دیجیتال) ',
            '48': 'خواندن کیسه در گذرنامه صادره بشماره ',
            '49': 'خواندن کیسه در گذرنامه وارده بشماره ',
            '50': 'حذف کیسه از گذرنامه بشماره ',
            '51': 'تحویل مرسوله به گیرنده ',
            '52': 'لغو ورود مرسوله امانت به منطقه ',
            '53': 'لغو ورود مرسوله امانت به منطقه با حذف نوبت ',
            '54': 'تحویل به سرویس ',
            '55': 'تحویل به فرستنده ',
            '56': 'عودت به فرستنده از باجه معطله ',
            '57': 'اشتباه تجزیه ',
            '58': 'نقص آدرس مبداء -غیر قابل توزیع ',
            '59': 'عودت مرسوله به فرستنده ',
            '60': 'خروج از صندوق شخصی ',
            '61': 'تحویل از صندوق شخصی ',
            '62': 'ثبت در گذرنامه صادره ',
            '63': 'حذف از گذرنامه صادره ',
            '64': 'ورود مرسوله به صندوق امانات توسط اپراتور ',
            '65': 'ورود مرسوله به صندوق امانات توسط مشتري ',
            '66': 'خروج مرسوله از صندوق و تحویل به مشتري ',
            '67': 'خروج مرسوله از صندوق و برگشت مرسوله ',
            '68': 'عودت به فروشگاه اینترنتی ',
            '69': 'تحویل صنادیق شخصی ',
            '70': 'ارسال از باجه معطله براي توزیع مجدد ',
            '71': 'تائید وضعیت مرسوله توسط سرنامه رسان ',
            '72': 'رهسپاري به مقصد بعدي ',
            '73': 'رسیدن از ارسال کننده قبلی',
        }[key] || key;
    }
}();
