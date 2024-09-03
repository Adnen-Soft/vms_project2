
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Fournisseurs extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				nom: { type:Sequelize.STRING   },
				type: { type:Sequelize.STRING   },
				telephone: { type:Sequelize.STRING   },
				adresse: { type:Sequelize.STRING   },
				note: { type:Sequelize.STRING   },
				photo: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "fournisseurs",
				modelName: "fournisseurs",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'photo', 
			'nom', 
			'type', 
			'telephone', 
			'adresse'
		];
	}

	static viewFields() {
		return [
			'id', 
			'nom', 
			'type', 
			'telephone', 
			'adresse', 
			'note', 
			'photo'
		];
	}

	static editFields() {
		return [
			'nom', 
			'type', 
			'telephone', 
			'adresse', 
			'note', 
			'photo', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("nom LIKE :search"), 
			Sequelize.literal("type LIKE :search"), 
			Sequelize.literal("telephone LIKE :search"), 
			Sequelize.literal("adresse LIKE :search"), 
			Sequelize.literal("note LIKE :search"),
		];
	}

	
	
}
Fournisseurs.init();
export default Fournisseurs;
