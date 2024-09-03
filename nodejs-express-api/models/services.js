
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Services extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				vehicule_id: { type:Sequelize.INTEGER   },
				type: { type:Sequelize.STRING   },
				montant: { type:Sequelize.DOUBLE   },
				fournisseur: { type:Sequelize.STRING   },
				note: { type:Sequelize.STRING   },
				image: { type:Sequelize.STRING   },
				document: { type:Sequelize.STRING   },
				date: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				user_id: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "services",
				modelName: "services",timestamps:true,
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
			'montant', 
			'fournisseur', 
			'note', 
			'image', 
			'document', 
			'date_created', 
			'date_updated', 
			'user_id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'vehicule_id', 
			'type', 
			'montant', 
			'fournisseur', 
			'note', 
			'image', 
			'document', 
			'date', 
			'date_created', 
			'date_updated', 
			'user_id'
		];
	}

	static editFields() {
		return [
			'vehicule_id', 
			'date', 
			'type', 
			'montant', 
			'fournisseur', 
			'note', 
			'image', 
			'document', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("type LIKE :search"), 
			Sequelize.literal("fournisseur LIKE :search"), 
			Sequelize.literal("note LIKE :search"), 
			Sequelize.literal("document LIKE :search"),
		];
	}

	
	
}
Services.init();
export default Services;
