mergeInto(LibraryManager.library, {
    /**
        * detail 分数数据 json string
    */
    postScore: function (payload) {
        console.log('[postScore]', payload);
        if (window.parent) {
            window.parent.postMessage(
                JSON.stringify({
                    type: 'postScore',
                    payload
                }),
                "*" 
            );
        }
    },
});