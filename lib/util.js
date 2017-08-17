module.exports.buildConfig = function (config) {
  config.upfront = {
    ulocks: {
      entityTypes: {
        "/any": 0,
        "/group": 1,
        "/user": 2,
        "/api": 5,
        "/const": 6,
        "/attr": 6,
        "/prop": 6,
        "/var": 6,
      },
      opTypes: {
        write: 0,
        read: 1
      },
      //fix this two eventually...
      locks: __dirname + "/Locks",
      actions: __dirname + "/Actions"
      /*locks: "./node_modules/UPFROnt/example/online/Locks/",
      actions: "./node_modules/UPFROnt/example/online/Actions"*/
    },
    pdp: {

    },
    pap: {
      // this specifies host, port and path where
      // this module should wait for requests
      // if specified, the module runs as a PAP server
      // if undefined, the module runs as a PAP client
      // accessing another PAP server
      /*server: {
          "host": "localhost",
          port: 1234,
          path: "/pap/",
          tls: false,
          cluster: 1
      },*/
      // storage specifies where the policies
      // are stored persistently:
      // 1. if policies are stored remotely
      // in another PAP, specify as type "remote"
      // and indicate host, port and path
      // 2. if policies are stored locally
      // in a database, specify the db module
      // ("mongodb", tbd) and the hostname and
      // port
      // thus, specifying type "remote" and specifying
      // api yields an invalid configuration
      storage: config.upfront_storage
    }
  };
  config['schema-validation'].forEach(function(s){
    if(s.id !== '/user'){
      config.upfront.ulocks.entityTypes[s.id] = 3;
    }
  });

  //in case custom locks and actions are needed (e.g. unit testing.)
  if(config.custom_locks && config.custom_actions){
    config.upfront.ulocks.locks = config.custom_locks;
    config.upfront.ulocks.actions = config.custom_actions;
  }
  console.log(JSON.stringify(config.upfront.ulocks.locks))
  console.log('types of entities in policy component '+JSON.stringify(config.upfront.ulocks.entityTypes));

  return config;

};
