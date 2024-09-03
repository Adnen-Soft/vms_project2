
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Vehicule extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				immatricule: { type:Sequelize.STRING   },
				nbr_places: { type:Sequelize.INTEGER   },
				marque: { type:Sequelize.STRING   },
				departement: { type:Sequelize.STRING   },
				chauffeur: { type:Sequelize.INTEGER   },
				image: { type:Sequelize.STRING   },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				nbr_chevaux: { type:Sequelize.INTEGER   },
				user_id: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "vehicule",
				modelName: "vehicule",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			'image', 
			'immatricule', 
			'marque', 
			'nbr_places', 
			'nbr_chevaux', 
			'departement', 
			Sequelize.literal('`users`.`username` AS `users_username`'), 
			'chauffeur', 
			'id'
		];
	}

	static viewFields() {
		return [
			'image', 
			'immatricule', 
			'nbr_places', 
			'marque', 
			'departement', 
			Sequelize.literal('`users`.`username` AS `users_username`'), 
			'chauffeur', 
			'nbr_chevaux', 
			'user_id', 
			'id'
		];
	}

	static editFields() {
		return [
			'image', 
			'immatricule', 
			'marque', 
			'nbr_places', 
			'nbr_chevaux', 
			'departement', 
			'chauffeur', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("immatricule LIKE :search"), 
			Sequelize.literal("marque LIKE :search"),
		];
	}

	
	
}
Vehicule.init();
export default Vehicule;
