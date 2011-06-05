hyve.stream('android',function(data){
    if (data.service in {
        'facebook':'', 'twitter':'', 'identica':'','buzz':''
    }){
        $('#microblogs ul').prepend(
            $('<li>' + data.text  + '</li>')
        )
    }
})
