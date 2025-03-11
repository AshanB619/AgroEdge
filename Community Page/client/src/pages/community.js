// // pages/community.js
// import { useState, useEffect } from 'react';
// import Head from 'next/head';

// export default function Community() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [replyContent, setReplyContent] = useState('');
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [currentUser, setCurrentUser] = useState({
//     id: '1',
//     name: 'Anjana Ranasinghe',
//     location: 'Anuradhapura',
//     avatar: '/api/placeholder/40/40'
//   });

//   // Mock data for initial messages
//   useEffect(() => {
//     const initialMessages = [
//       {
//         id: '1',
//         user: {
//           id: '2',
//           name: 'Kumara Perera',
//           location: 'Kandy',
//           avatar: '/api/placeholder/40/40'
//         },
//         content: 'My paddy crops are showing yellow leaves with brown spots. Has anyone faced this issue before? I suspect it might be a fungal infection.',
//         timestamp: '2025-03-08T09:30:00',
//         replies: [
//           {
//             id: '1-1',
//             user: {
//               id: '3',
//               name: 'Nimal Silva',
//               location: 'Galle',
//               avatar: '/api/placeholder/40/40'
//             },
//             content: 'I had a similar issue last season. It sounds like rice blast disease. I recommend using Tricyclazole fungicide and ensuring proper drainage in your field.',
//             timestamp: '2025-03-08T10:15:00'
//           }
//         ]
//       },
//       {
//         id: '2',
//         user: {
//           id: '4',
//           name: 'Lakshmi Fernando',
//           location: 'Kurunegala',
//           avatar: '/api/placeholder/40/40'
//         },
//         content: 'Is anyone using drip irrigation for vegetable cultivation? I want to install it but unsure about the cost and maintenance.',
//         timestamp: '2025-03-09T08:45:00',
//         replies: []
//       },
//       {
//         id: '3',
//         user: {
//           id: '5',
//           name: 'Ranjith Dissanayake',
//           location: 'Matale',
//           avatar: '/api/placeholder/40/40'
//         },
//         content: 'What fertilizer mix is best for chili plants during the flowering stage? My yield has been decreasing over the past two seasons.',
//         timestamp: '2025-03-09T14:20:00',
//         replies: [
//           {
//             id: '3-1',
//             user: {
//               id: '6',
//               name: 'Chaminda Jayawardena',
//               location: 'Hambantota',
//               avatar: '/api/placeholder/40/40'
//             },
//             content: 'For chili flowering stage, I use a low nitrogen, high phosphorus and potassium mix (NPK 5-10-10). Also add some calcium to prevent blossom end rot. This has given me excellent results.',
//             timestamp: '2025-03-09T15:05:00'
//           }
//         ]
//       }
//     ];
//     setMessages(initialMessages);
//   }, []);

//   const handlePostMessage = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const newMsg = {
//       id: (messages.length + 1).toString(),
//       user: currentUser,
//       content: newMessage,
//       timestamp: new Date().toISOString(),
//       replies: []
//     };

//     setMessages([...messages, newMsg]);
//     setNewMessage('');
//   };

//   const handleReply = (messageId) => {
//     if (!replyContent.trim()) return;

//     const updatedMessages = messages.map(msg => {
//       if (msg.id === messageId) {
//         return {
//           ...msg,
//           replies: [
//             ...msg.replies,
//             {
//               id: `${messageId}-${msg.replies.length + 1}`,
//               user: currentUser,
//               content: replyContent,
//               timestamp: new Date().toISOString()
//             }
//           ]
//         };
//       }
//       return msg;
//     });

//     setMessages(updatedMessages);
//     setReplyContent('');
//     setReplyingTo(null);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString('en-US', { 
//       day: 'numeric', 
//       month: 'short',
//       hour: '2-digit', 
//       minute: '2-digit'
//     });
//   };

//   return (
//     <>
//       <Head>
//         <title>AgroEdge - Farmer Community</title>
//         <meta name="description" content="AgroEdge farmer community platform" />
//       </Head>

//       <div className="min-h-screen bg-green-50">
//         <header className="bg-green-700 text-white shadow-md">
//           <div className="container mx-auto py-4 px-6">
//             <h1 className="text-2xl font-bold">AgroEdge Farmer Community</h1>
//             <p className="text-sm">Connect, share, and grow with fellow farmers</p>
//           </div>
//         </header>

//         <main className="container mx-auto px-4 py-8">
//           {/* Post new message */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <h2 className="text-xl font-semibold mb-4">Share with the community</h2>
//             <form onSubmit={handlePostMessage}>
//               <textarea
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 rows="4"
//                 placeholder="Ask a question or share your farming knowledge..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 required
//               ></textarea>
//               <div className="mt-3 flex justify-end">
//                 <button 
//                   type="submit" 
//                   className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md"
//                 >
//                   Post Message
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Messages list */}
//           <div className="space-y-6">
//             {messages.map((message) => (
//               <div key={message.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 {/* Main message */}
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-start">
//                     <img 
//                       src={message.user.avatar} 
//                       alt={message.user.name} 
//                       className="w-10 h-10 rounded-full mr-4"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between items-center mb-2">
//                         <div>
//                           <h3 className="font-medium text-gray-900">{message.user.name}</h3>
//                           <p className="text-sm text-gray-500">{message.user.location}</p>
//                         </div>
//                         <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
//                       </div>
//                       <p className="text-gray-700">{message.content}</p>
//                       <button
//                         onClick={() => setReplyingTo(message.id)}
//                         className="mt-3 text-sm text-green-600 hover:text-green-800"
//                       >
//                         Reply to this
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Reply form */}
//                 {replyingTo === message.id && (
//                   <div className="px-6 py-4 bg-green-50 border-b border-gray-100">
//                     <textarea
//                       className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                       rows="3"
//                       placeholder="Share your answer or suggestion..."
//                       value={replyContent}
//                       onChange={(e) => setReplyContent(e.target.value)}
//                     ></textarea>
//                     <div className="mt-3 flex justify-end space-x-3">
//                       <button 
//                         onClick={() => setReplyingTo(null)} 
//                         className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4"
//                       >
//                         Cancel
//                       </button>
//                       <button 
//                         onClick={() => handleReply(message.id)} 
//                         className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
//                       >
//                         Submit Reply
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Replies */}
//                 {message.replies.length > 0 && (
//                   <div className="bg-gray-50">
//                     {message.replies.map((reply) => (
//                       <div key={reply.id} className="p-4 pl-12 border-t border-gray-100">
//                         <div className="flex items-start">
//                           <img 
//                             src={reply.user.avatar} 
//                             alt={reply.user.name}
//                             className="w-8 h-8 rounded-full mr-3" 
//                           />
//                           <div className="flex-1">
//                             <div className="flex justify-between items-center mb-1">
//                               <div>
//                                 <h4 className="font-medium text-gray-900">{reply.user.name}</h4>
//                                 <p className="text-xs text-gray-500">{reply.user.location}</p>
//                               </div>
//                               <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
//                             </div>
//                             <p className="text-gray-700 text-sm">{reply.content}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </main>

//         <footer className="bg-green-800 text-white py-6">
//           <div className="container mx-auto px-4 text-center">
//             <p>&copy; 2025 AgroEdge. Developed by CS144 Group.</p>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// }