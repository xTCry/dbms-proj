import russianMessages from 'ra-language-russian';

const customMessages = {
    ...russianMessages,
    login: { required: 'Необходима авторизация' },
    bo: {
        configuration: 'Конфигурация',
        profile: {
            title: 'Профиль',
        },
        language: 'Язык',
        theme: {
            name: 'Тема',
            light: 'Светлая',
            dark: 'Тёмная',
        },
        wrong_login_password: 'Неверный логин или пароль',
        invalid_access_token: 'Неверный токен доступа',
        token_expired: 'Токен просрочился, повторите авторизацию',
        role_forbidden: 'Ваша роль не разрешена',
    },
    resources: {
        user: {
            name: 'Пользователь |||| Пользователи',
            fields: {
                login: 'Логин',
                name: 'Имя',
                last_name: 'Фамилия',
                second_name: 'Отчество',
                password: 'Пароль',
                personal_address: 'Адрес',
                personal_birthday: 'Дата рождения',
                personal_telephone: 'Телефон',
                role_id: 'Роль',
                photo_path: 'Фото профиля',
                registeration_date: 'Дата регистрации',
            },
            page: {
                empty: 'Пользователей еще нету',
                invite: 'Добавьте пользователя',
            },
        },
        student: {
            name: 'Студент |||| Студенты',
            fields: {
                name: 'Название группы',
                student_id: 'Номер зачетки',
                group_id: 'Группа',
                user_id: 'Пользователь',
                'user.role_id': 'Роль',
            },
            page: {
                empty: 'Студентов еще нету',
                invite: 'Добавьте студента',
            },
        },
        teacher: {
            name: 'Преподаватель |||| Преподаватели',
            fields: {
                user_id: 'Пользователь',
                lessons: 'Дисциплины',
                experience: 'Стаж работы',
                lesson_name: 'Предмет',
            },
            page: {
                empty: 'Преподавателей еще нету',
                invite: 'Добавьте преподавателей',
            },
        },
        group: {
            name: 'Граппа |||| Группы',
            fields: {
                name: 'Название',
                date_formation: 'Дата формирования',
                specialty_id: 'Специальность',
            },
            page: {
                empty: 'Группы еще не добавлены',
                invite: 'Добавьте группу',
            },
        },
        mark: {
            name: 'Отметка |||| Отметки',
            fields: {
                value: 'Значение',
                date: 'Дата выставления',
                student_id: 'Студент',
                schedule_id: 'Расписание',
            },
            page: {
                empty: 'Отметок еще нету',
                invite: 'Добавьте отметку',
            },
        },
        mark_log: {
            name: 'Лог отметок',
            fields: {
                changed_date: 'Дата изменения',
                last_value: 'Прошлое значение',
                new_value: 'новое значение',
                mark_id: 'Отметка',
            },
            page: {
                empty: 'Журнал изменения отметок пуст',
                invite: 'Измените отметку и здесь появится запись',
            },
        },
        schedule: {
            name: 'Расисание |||| Расписания',
            fields: {
                date: 'Дата',
                time_start: 'Время начала',
                lesson_type: 'Тип',
                duration: 'Длительность',
                teacher_id: 'Преподваватель',
                lesson_id: 'Предмет',
                group_id: 'Группа',
                auditory_id: 'Аудитория',
            },
            type: {
                none: 'Не указано',
                lecture: 'Лекция',
                practice: 'Практика',
                lab: 'Лабораторная',
                other: 'Другое',
                exam: 'Экзамен',
            },
            page: {
                empty: 'Расписание еще не добавлено',
                invite: 'Добавьте расписание',
            },
        },
        lesson: {
            name: 'Предмет |||| Предметы',
            fields: {
                name: 'Название',
            },
            page: {
                empty: 'Предметов еще нету',
                invite: 'Добавьте предмет',
            },
        },
        auditory: {
            name: 'Аудитория |||| Аудитории',
            fields: {
                name: 'Название',
                corpus: 'Корпус',
            },
            page: {
                empty: 'Список аудиторий пуст',
                invite: 'Добавьте аудиторию',
            },
        },
        specialty: {
            name: 'Специальность |||| Специальности',
            fields: {
                name: 'Название',
                kafedra_id: 'Кафедра',
            },
            page: {
                empty: 'Специальности еще не заполнены',
                invite: 'Добавьте специальность',
            },
        },
        kafedra: {
            name: 'Кафедра |||| Кафедры',
            fields: {
                name: 'Название',
            },
            page: {
                empty: 'Кафедры еще не добавлены',
                invite: 'Добавьте кафедру',
            },
        },
        teacher2lesson: {
            name: 'Дисциплина преп. |||| Дисциплины преп.',
            fields: {
                teacher_id: 'Преподваватель',
                lesson_id: 'Предмет',
            },
            page: {
                empty: 'Дисциплин преподавателей не найдено',
                invite: 'Добавьте преподавателю дисциплину',
            },
        },
        headman2group: {
            name: 'Староста |||| Старосты',
            fields: {
                student_id: 'Студент',
                group_id: 'Группа',
            },
            page: {
                empty: 'Старосты групп не обнаружены',
                invite: 'Добавьте старост групп',
            },
        },
        role: {
            name: 'Роли',
            data: {
                NONE: 'Никто',
                USER: 'Пользователь',
                STUDENT: 'Студент',
                TEACHER: 'Преподаватель',
                DEKAN: 'Деканат',
                ADMIN: 'Администратор',
            },
        },
    },
    csv: {
        buttonMain: {
            label: 'Импорт',
            tooltip: "Это должен быть файл с расширением '.csv' или '.tsv'.",
            emptyResource: "Свойство 'resource' было пустым, вы точно передали {...props} в ImportButton?",
        },
        parsing: {
            collidingIds: 'Обнаружены конфликтующие поля "id"',
            failedValidateRow: 'CSV не прошел требуемую валидацию',
            invalidCsv: 'Документ не может быть проанализирован как файл "csv"',
        },
        dialogCommon: {
            subtitle: 'Импорт %{count} элементов из %{fileName} в "%{resource}"',
            conflictCount:
                'Ресурс <strong>%{resource}</strong> имеет еще <strong>%{conflictingCount}</strong> записей с конфликтующими id',
            buttons: {
                cancel: 'Отмена',
            },
        },
        dialogImport: {
            alertClose: 'Импортирован %{fname}',
            title: 'Импортирование в "%{resource}"',
            buttons: {
                replaceAllConflicts: 'Заменить строки',
                skipAllConflicts: 'Пропустить эти строки',
                letmeDecide: 'Принять решение для каждой строки вручную',
            },
        },
        dialogDecide: {
            title: 'Импортирование id %{id} в "%{resource}"',
            buttons: {
                replaceRow: 'Заменить строку id=%{id}',
                addAsNewRow: 'Добавить как новую строку (не заменять)',
                skipDontReplace: 'Пропустить эту строку (не заменять)',
            },
        },
        loading: 'Загрузка...',
    },
};

export default customMessages;
