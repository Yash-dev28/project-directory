// $(document).ready(function() {
//     const socket = io();
  
//     socket.on('connect', () => {
//       const userId = 'user_id_from_session_or_cookie'; // Fetch this from session or cookie
//       socket.emit('joinLiveUsers', userId);
//     });
  
//     socket.on('userJoined', user => {
//       console.log('User joined:', user);
//       $('#liveUsersList').append(`
//         <div class="user">
//           <p><strong>Email:</strong> <span class="user-email">${user.email}</span></p>
//           <p><strong>Name:</strong> ${user.name}</p>
//           <p><strong>Socket ID:</strong> <span class="user-socket-id">${user.socketId}</span></p>
//         </div>
//       `);
//     });
  
//     socket.on('disconnect', () => {
//       console.log(`Socket disconnected: ${socket.id}`);
//     });
//   });
  