mergeInto(LibraryManager.library, {
    /**
        * detail 分数数据 json string
    */
    postScore: function (str) {
        var payload = Pointer_stringify(str);
        console.log('[postScore]', payload);
        if (window.parent) {
            window.parent.postMessage(JSON.stringify({type: 'postScore', payload:payload}), "*" );
        }
    },
});

