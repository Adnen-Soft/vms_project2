
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Societe extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				nom: { type:Sequelize.STRING   },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "societe",
				modelName: "societe",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'nom', 
			'date_created', 
			'date_updated'
		];
	}

	static viewFields() {
		return [
			'id', 
			'nom', 
			'date_created', 
			'date_updated'
		];
	}

	static editFields() {
		return [
			'nom', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("nom LIKE :search"),
		];
	}

	
	
}
Societe.init();
export default Societe;
