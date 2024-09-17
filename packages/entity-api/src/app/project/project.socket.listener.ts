import { Socket, Server } from 'socket.io';
import ProjectHandler from './project.socket.handler';

const ProjectListener = (io:Server, socket:Socket) => {
  const { create, update, remove } = ProjectHandler(io, socket);
  console.log('Client ID (projects):'.green, socket.id);
  socket.emit('projects:welcome', { message: 'Welcome to projects' });
  socket.on('projects:create', create);
  socket.on('projects:update', update);
  socket.on('projects:delete', remove);
  socket.on('disconnect', () => {
    console.log(`${socket.id} had left from projects!`.red);
  });
};

export default ProjectListener;
