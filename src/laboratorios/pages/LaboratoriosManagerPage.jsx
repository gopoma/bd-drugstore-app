import { useEffect } from 'react';
import { useLaboratoriosStore } from '../../hooks';
import { LaboratoriosButtons, LaboratoriosForm, LaboratoriosTable } from '../components';
import classes from '../../styles/Container.module.css';

export const LaboratoriosManagerPage = () => {
  const { startLoadingLaboratorios } = useLaboratoriosStore();

  useEffect(() => {
    startLoadingLaboratorios();
  }, []);

  return (
    <div className={classes['main-container']}>
      <div className={classes['container']}>
        <h1>Laboratorios</h1>

        <LaboratoriosForm />

        <LaboratoriosTable />

        <LaboratoriosButtons />
      </div>
    </div>
  );
};

export default LaboratoriosManagerPage;
