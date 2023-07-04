import { useEffect } from 'react';
import { useRolesStore } from '../../../hooks';
import { RolesButtons, RolesForm, RolesTable } from '../components';
import classes from '../../../styles/Container.module.css';

export const RolesManagerPage = () => {
  const { startLoadingRoles } = useRolesStore();

  useEffect(() => {
    startLoadingRoles();
  }, []);

  return (
    <div className={classes['main-container']}>
      <div className={classes['container']}>
        <h1>Roles</h1>

        <RolesForm />

        <RolesTable />

        <RolesButtons />
      </div>
    </div>
  );
};

export default RolesManagerPage;
