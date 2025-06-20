import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/interfaces/user';
import FirestoreClient from '../database/firestoreClient';


export class UserRepositoryFirestore implements UserRepository {
    private db = FirestoreClient.getInstance();
    
   async findById(email: string): Promise<User | null> {
         const doc = await this.db.collection('user').where('email', '==', email).limit(1).get();
        if (doc.empty) return null;
        const data = doc.docs[0];
        
        return new User(data.id, data.data().email);
    }

   async CreateUser(user: Omit<User,'id'>): Promise<User> {
      const doc =   await this.db.collection('user').add({
            email: user.email
        })
        return new User(doc.id, user.email);
    }

}