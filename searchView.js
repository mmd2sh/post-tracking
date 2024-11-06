if (!window.isTrackingModuleInited) { // FIX MODULE BUILDER RUN TWICE!!!
    window.isTrackingModuleInited = true;

    !function() {
        const thisScript = document.currentScript;
        const mbWrap = $(thisScript).closest('.mb-wrapper');
    
        $(document).ready(function() {
            const loading = $('.tracking-search-loading', mbWrap);
            
            loading.each(function() {
                const wrap = $(this).parent().find('[data-dbfield=trackingCode]').parent();
                $(this).appendTo(wrap);
            });
            
            const submitBtn = $('[id*=search_wrapper]:has(.tracking-search-wrap) input.drt-searchBtn[data-identifier*=search_]', mbWrap);
            
            submitBtn.each(function(_, btn) {
                const wrap = $(btn).parent().find('[data-dbfield=trackingCode]').parent();
                $(btn).appendTo(wrap);
                
                $(btn).on('click', function() {
                    loading.show();
                    $(btn).prop('disabled', true);
                    
                    mbWrap.addClass('submit-clicked');
                    
                });
            });
            
            const input = $('input[data-dbfield="trackingCode"]', mbWrap);
            
            input.prop('placeholder', 'شماره مرسوله را وارد کنید.');
            
            // input.on('input', function() {
            //     this.value = this.value.trim();
            //     let isValid = this.value.length == 24;
            //     submitBtn.prop('disabled', !isValid);
            // });
            
            mbWrap.on('click', '.dp-alertBox', function() {
                $(this).closest('[data-module-layout-wrapper]').hide();
            
                loading.hide();
                submitBtn.prop('disabled', false);
            });
            
            input.on('keypress', function(ev) {
                if (ev.key === 'Enter' || ev.keyCode === 13) {
                    submitBtn.click();
                }
            });

        });
    }();
} // end mb fix
