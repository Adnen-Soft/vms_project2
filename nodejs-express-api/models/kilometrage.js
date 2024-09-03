
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Kilometrage extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				vehicule_id: { type:Sequelize.INTEGER   },
				date: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				compteur: { type:Sequelize.DOUBLE   },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				user_id: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "kilometrage",
				modelName: "kilometrage",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'date', 
			Sequelize.literal('`vehicule`.`immatricule` AS `vehicule_immatricule`'), 
			'vehicule_id', 
			'compteur'
		];
	}

	static viewFields() {
		return [
			'id', 
			'vehicule_id', 
			'date', 
			'compteur', 
			'date_created', 
			'date_updated', 
			'user_id'
		];
	}

	static editFields() {
		return [
			'vehicule_id', 
			'compteur', 
			'date', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("date LIKE :search"), 
			Sequelize.literal("compteur LIKE :search"),
		];
	}

	
	
}
Kilometrage.init();
export default Kilometrage;
