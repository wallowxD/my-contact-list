import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonAvatar, IonImg, IonSearchbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import { useData } from '../hooks/useData';

const Home: React.FC = () => {
  const {data} = useData();


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Contact List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonList>
          {data.map((item: any, index) => (
            <IonItem key={index} routerLink = {`home/details/${item.email}`}>
              <IonAvatar slot = "start">
                <IonImg src = {item.picture.thumbnail}/>
              </IonAvatar>
              <IonLabel>{item.name.first} {item.name.last}
              <p>{item.email}</p></IonLabel>
            </IonItem>
          ))}

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
