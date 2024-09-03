
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Panne extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				date: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				type: { type:Sequelize.STRING   },
				photo: { type:Sequelize.STRING   },
				vehicule_id: { type:Sequelize.INTEGER   },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				user_id: { type:Sequelize.INTEGER   },
				statut: { type:Sequelize.STRING   },
				description: { type:Sequelize.STRING   },
				priorite: { type:Sequelize.STRING   },
				document: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "panne",
				modelName: "panne",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			Sequelize.literal('`vehicule`.`immatricule` AS `vehicule_immatricule`'), 
			'vehicule_id', 
			'date', 
			'type', 
			'statut', 
			'photo', 
			'description', 
			'priorite', 
			'document'
		];
	}

	static viewFields() {
		return [
			'id', 
			'date', 
			'type', 
			'photo', 
			'vehicule_id', 
			'date_created', 
			'date_updated', 
			'user_id', 
			'statut', 
			'description', 
			'priorite', 
			'document'
		];
	}

	static editFields() {
		return [
			'vehicule_id', 
			'date', 
			'type', 
			'description', 
			'statut', 
			'priorite', 
			'photo', 
			'document', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("vehicule_id LIKE :search"), 
			Sequelize.literal("type LIKE :search"), 
			Sequelize.literal("statut LIKE :search"), 
			Sequelize.literal("description LIKE :search"), 
			Sequelize.literal("priorite LIKE :search"), 
			Sequelize.literal("document LIKE :search"),
		];
	}

	
	
}
Panne.init();
export default Panne;
