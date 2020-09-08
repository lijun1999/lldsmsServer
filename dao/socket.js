module.exports = function(io) {
    io.on('connect', socket => {
        console.log('有人连接了')
        // // either with send()
        // socket.send('Hello!');
    
        // // or with emit() and custom event names
        // socket.emit('greetings', 'Hey!', {
        //     'ms': 'jane'
        // }, Buffer.from([4, 3, 3, 1]));
    
        // // handle the event sent with socket.send()
        // socket.on('message', (data) => {
        //     console.log(data);
        // });
    
        // // handle the event sent with socket.emit()
        // socket.on('login', (id) => {
        //     console.log(id);
        //     socket.emit('msg',id)
        // });
    });
}