
Gmail
email: trytassos@gmail.com
pass: tassos12345

Dropbox
email: trytassos@gmail.com
pass: tassos12345



<YOUR-ACCESS-TOKEN> = 05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu


// make a default datastore

curl https://api.dropbox.com/1/datastores/get_or_create_datastore -d dsid=default -H "Authorization: Bearer <YOUR-ACCESS-TOKEN>"

curl https://api.dropbox.com/1/datastores/get_or_create_datastore -d dsid=default -H "Authorization: Bearer 05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu"

-> {"handle": "OFoEkC1vmfvF3X3Qekjg15fvwhxAZn", "rev": 0, "created": true}


// make a logs datastore

curl https://api.dropbox.com/1/datastores/get_or_create_datastore -d dsid=default -H "Authorization: Bearer <YOUR-ACCESS-TOKEN>"

curl https://api.dropbox.com/1/datastores/get_or_create_datastore -d dsid=logs -H "Authorization: Bearer 05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu"

-> {"handle": "eBgq2tXRM8YA0QETZqjhBmsk7m8KFq", "rev": 0, "created": true}


// list the datastores

curl https://api.dropbox.com/1/datastores/list_datastores -H "Authorization: Bearer <YOUR-ACCESS-TOKEN>"

curl https://api.dropbox.com/1/datastores/list_datastores -H "Authorization: Bearer 05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu"

-> {"datastores": [{"handle": "OFoEkC1vmfvF3X3Qekjg15fvwhxAZn", "rev": 0, "dsid": "default"}, {"handle": "eBgq2tXRM8YA0QETZqjhBmsk7m8KFq", "rev": 0, "dsid": "logs"}], "token": "011aa6f4006330bf24ac5f1eae8366883c56107b6da5607619713eeef9936ccb"}


// get a snapshot of the logs datastore

curl https://api.dropbox.com/1/datastores/get_snapshot?handle=<DATASTORE-HANDLE> -H "Authorization: Bearer <YOUR-ACCESS-TOKEN>

curl https://api.dropbox.com/1/datastores/get_snapshot?handle=eBgq2tXRM8YA0QETZqjhBmsk7m8KFq -H "Authorization: Bearer 05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu"

-> {"rows": [], "rev": 0}

// and the default datastore

curl https://api.dropbox.com/1/datastores/get_snapshot?handle=OFoEkC1vmfvF3X3Qekjg15fvwhxAZn -H "Authorization: Bearer 05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu"


// END