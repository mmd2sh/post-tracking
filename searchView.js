if (!window.isTrackingModuleInited) { // FIX MODULE BUILDER RUN TWICE!!!
    window.isTrackingModuleInited = true;

    !function() {
        const thisScript = document.currentScript;
        const mbWrap = $(thisScript).closest('.mb-wrapper');
    
        $(document).ready(function() {
            const loading = $('.tracking-search-loading', mbWrap);
            
            // loading.each(function() {
            //     const wrap = $(this).parent().find('[data-dbfield=trackingCode]').parent();
            //     $(this).appendTo(wrap);
            // });
            
            const submitBtn = $('[id*=search_wrapper]:has(.tracking-search-wrap) input.drt-searchBtn[data-identifier*=search_]', mbWrap);
            
            submitBtn.each(function(_, btn) {
                const wrap = $('.tracking-search-bar', mbWrap);
                $(btn).appendTo(wrap);
                
                $(btn).on('click', function() {
                    loading.show();
                    $(btn).prop('disabled', true);
                    
                    mbWrap.addClass('submit-clicked');
                    
                });
            });
            
            const input = $('input[data-dbfield="trackingCode"]', mbWrap);
            
            input.prop('placeholder', 'شماره مرسوله را وارد کنید.');
            
            
            input.on('input paste change', function() {
                // Convert Arabic and Persian digits to English
                this.value = this.value.replace(/[۰-۹]/g, function(d) {
                    return String.fromCharCode(d.charCodeAt(0) - 1728);
                }).replace(/[٠-٩]/g, function(d) {
                    return String.fromCharCode(d.charCodeAt(0) - 1584);
                });
            
                // Remove non-digit characters and trim length to 24 characters
                this.value = this.value.replace(/\D/g, '').substring(0, 24);
            
                let isValid = this.value.length == 24;
            
                // Update character counter
                $('.tracking-search-counter bdi').text(this.value.length);
            
                // submitBtn.prop('disabled', !isValid);
            });

            
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
            
            $('.tracking-search-paste', mbWrap).on('click', async function() {
                try {
                    const text = await navigator.clipboard.readText();
                    input.val(text).change();
                } catch (err) {
                    console.error("Failed to read clipboard contents:", err);
                }
                
            });

        });
    }();
} // end mb fix
