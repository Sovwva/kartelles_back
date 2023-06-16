import User from "./user.js";
import generateToken from "../logic/token.js"

class User_controller {
    async create(req, res) {
        try {
            const {login, password} = req.body;
            const createdUser = await User.create({login, password});
            console.log(req.body);
            res.json(createdUser);
        } catch (e) {
            res.status(500).json({error: 'User creation failed'});
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id; // Получение ID из URL-адреса
            const user = req.body;
            if (!user.password) {
                // Проверка, чтобы обновить только пароль
                return res.status(400).json({ message: "Password is required for update" });
            }
            const updatedUser = await User.findByIdAndUpdate(id, { password: user.password }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(updatedUser);
        } catch (e) {
            console.log("update")
            res.status(500).json({ error: e.message });
        }
    }


    async Login(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login });

            if (!user || user.password !== password) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = generateToken(user.id);

            user.token = token; // Сохраняем токен в поле пользователя
            await user.save(); // Сохраняем обновленного пользователя в базе данных

            res.json({ message: "Login Successful", accessToken: token, id: user.id });
        } catch (e) {
            res.status(500).json({ error: "User validation Error" });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "id is not declared" });
            }

            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.json(deletedUser);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async logout(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Удаление токена пользователя
            user.token = null; // Замените на свою логику удаления токена

            await user.save(); // Сохраняем изменения в базе данных

            res.status(200).json({message : "logout successfully"})
            // res.redirect('/'); // Перенаправляем на главную страницу или другую страницу после выхода (logout)
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }


}

export default new User_controller();