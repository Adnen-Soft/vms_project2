
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Users extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				username: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				password: { type:Sequelize.STRING   },
				email: { type:Sequelize.STRING   },
				photo: { type:Sequelize.STRING   },
				account_status: { type:Sequelize.STRING   },
				user_role_id: { type:Sequelize.INTEGER , allowNull: false  },
				tpro: { type:Sequelize.INTEGER , allowNull: false  },
				tcertif: { type:Sequelize.INTEGER , allowNull: false  },
				telephone: { type:Sequelize.INTEGER   },
				sup_hia: { type:Sequelize.INTEGER   },
				date_embauche: { type:Sequelize.DATEONLY  ,defaultValue: Sequelize.literal('DEFAULT') },
				sold_conge: { type:Sequelize.NUMBER , allowNull: false  },
				ext_num: { type:Sequelize.INTEGER   },
				ext_pass: { type:Sequelize.STRING   },
				web_pass: { type:Sequelize.STRING   },
				cin: { type:Sequelize.STRING   },
				cnss: { type:Sequelize.STRING   },
				agence: { type:Sequelize.STRING   },
				departement: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "users",
				modelName: "users",
			}
		);
	}
	
	static listFields() {
		return [
			'username', 
			'email', 
			'photo', 
			'account_status', 
			'id'
		];
	}

	static viewFields() {
		return [
			'username', 
			'email', 
			'account_status', 
			'telephone', 
			'id'
		];
	}

	static accountviewFields() {
		return [
			'id', 
			'username', 
			'email', 
			'telephone', 
			'account_status', 
			'sold_conge'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("username LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("account_status LIKE :search"), 
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("ext_pass LIKE :search"), 
			Sequelize.literal("web_pass LIKE :search"), 
			Sequelize.literal("CIN LIKE :search"), 
			Sequelize.literal("CNSS LIKE :search"), 
			Sequelize.literal("agence LIKE :search"), 
			Sequelize.literal("Departement LIKE :search"),
		];
	}

	
	
}
Users.init();
export default Users;
