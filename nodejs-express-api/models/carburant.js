
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Carburant extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				vehicle: { type:Sequelize.INTEGER   },
				date: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				montant: { type:Sequelize.STRING   },
				fournisseur: { type:Sequelize.STRING   },
				photo: { type:Sequelize.STRING   },
				document: { type:Sequelize.STRING   },
				commentaire: { type:Sequelize.STRING   },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				user_id: { type:Sequelize.INTEGER   },
				quantity: { type:Sequelize.INTEGER   },
				type: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "carburant",
				modelName: "carburant",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			Sequelize.literal('`vehicule`.`immatricule` AS `vehicule_immatricule`'), 
			'vehicle', 
			'date', 
			'quantity', 
			'type', 
			'montant', 
			'fournisseur'
		];
	}

	static viewFields() {
		return [
			'id', 
			'vehicle', 
			'date', 
			'montant', 
			'fournisseur', 
			'photo', 
			'document', 
			'commentaire', 
			'date_created', 
			'date_updated', 
			'user_id', 
			'quantity', 
			'type'
		];
	}

	static editFields() {
		return [
			'vehicle', 
			'date', 
			'type', 
			'quantity', 
			'montant', 
			'fournisseur', 
			'photo', 
			'document', 
			'commentaire', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("vehicle LIKE :search"), 
			Sequelize.literal("date LIKE :search"), 
			Sequelize.literal("quantity LIKE :search"), 
			Sequelize.literal("type LIKE :search"), 
			Sequelize.literal("montant LIKE :search"), 
			Sequelize.literal("fournisseur LIKE :search"),
		];
	}

	
	
}
Carburant.init();
export default Carburant;
