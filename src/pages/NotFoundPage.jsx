import classes from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <div className={classes['container']}>
      
      <div className={classes['container-not-found']}>
        <img className={classes['img']} src="https://media.giphy.com/media/C21GGDOpKT6Z4VuXyn/giphy.gif" alt="not-found" />
        <div className={classes['information']}>
          <p className={classes['text']}>The resource that you&apos;re looking for is not available at the moment</p>
        </div>
      </div>
      
    </div>
  );
};

export default NotFoundPage;
