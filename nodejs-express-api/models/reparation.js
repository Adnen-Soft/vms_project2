
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Reparation extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				vehicule_id: { type:Sequelize.INTEGER   },
				date: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				type: { type:Sequelize.STRING   },
				note: { type:Sequelize.STRING   },
				montant: { type:Sequelize.DOUBLE   },
				fournisseur: { type:Sequelize.STRING   },
				photo: { type:Sequelize.STRING   },
				document: { type:Sequelize.STRING   },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				user_id: { type:Sequelize.INTEGER   },
				panne_id: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "reparation",
				modelName: "reparation",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			Sequelize.literal('`vehicule`.`immatricule` AS `vehicule_immatricule`'), 
			'vehicule_id', 
			'panne_id', 
			'date', 
			'type', 
			'note', 
			'montant', 
			'fournisseur', 
			'photo', 
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
			'date', 
			'type', 
			'note', 
			'montant', 
			'fournisseur', 
			'photo', 
			'document', 
			'date_created', 
			'date_updated', 
			'user_id', 
			'panne_id'
		];
	}

	static editFields() {
		return [
			'vehicule_id', 
			'panne_id', 
			'date', 
			'type', 
			'note', 
			'montant', 
			'fournisseur', 
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
			Sequelize.literal("note LIKE :search"), 
			Sequelize.literal("fournisseur LIKE :search"), 
			Sequelize.literal("document LIKE :search"),
		];
	}

	
	
}
Reparation.init();
export default Reparation;
