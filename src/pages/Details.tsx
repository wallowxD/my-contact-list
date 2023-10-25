import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';
import { useData } from '../hooks/useData';
import { RouteComponentProps } from 'react-router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


interface UserDetailPageProps extends RouteComponentProps<{
  email: string;
}> {}

const Details: React.FC<UserDetailPageProps> = ({match}) => {
  const {getUserByEmail} = useData();
  const [user, setUser] = useState(null as any);
  const [image, setImage] = useState(null as any);

  useIonViewWillEnter(() => {
    const fetchUser = async () => {
      const user = await getUserByEmail(match.params.email);
      setUser(user);
    };
    fetchUser();
  });

//capture image
  const captureImage = async () => {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    const image = `data:image/jpeg;base64,${photo.base64String}`;
    //change the image in the card
    setImage(image);
    //set the photo in the user object
    user.picture.large = image;

  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot = "start">
            <IonBackButton defaultHref = "/home"></IonBackButton>
          </IonButtons>
          <IonTitle>{user?.email}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {user?.name.first} {user?.name.last}
            </IonCardTitle>
            <IonCardContent>
              <img src={user?.picture.large} alt="img"/>
            </IonCardContent>
          </IonCardHeader>
        </IonCard>
        <IonButton onClick = {captureImage}>Change Image</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Details;

