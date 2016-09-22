// import Beacon from 'models/beacon';

export default function(router) {

  router.get('/status', async ctx => {
    ctx.body = { success: true };
  });

}