let remote:boolean = false;
let remote_ip:string = '192.168.0.147';
let local_ip:string=location.hostname
let db_remote_ip:string=''
let db_local_ip:string=location.hostname

export default {
    baseURL: remote?`http://${remote_ip}:8000`:`http://${local_ip}:8000`,
    db_baseURL:remote?`http://${db_remote_ip}:8090`:`http://${db_local_ip}:8090`,
    // ws:'ws://'+location.host,
    isDev: true,
    // socket: "192.168.103.142:8082",
}
