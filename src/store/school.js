import common from '@/services/api/common';
import studyManage from '@/services/api/studyManage';
import grade from '@/services/api/grade';
import account from '@/services/api/accountApi';

export default {
    namespaced: true,
    state: {
        schoolLists: [], //学院
        majorLists: [], //专业
        specialtyLists: [], //专业课
        gradeLists: [], //班级
        readTeacher: [], //阅卷老师
        teacherLists: [], //(授课老师、班主任)
        examTypeLists: []//试卷类型
    },
    mutations: {
        getSchoolListMutations(state, payload) {
            state.schoolLists = payload;

        },
        getMajorListMutations(state, payload) {
            state.majorLists = payload;
        },
        getStudyManageMutation(state, payload) {
            state.specialtyLists = payload;
        },
        getReadTeacherMutation(state, payload) {
            state.readTeacher = payload;
        },
        getGradeListMutation(state, payload) {
            state.gradeLists = payload;
        },
        getTeacherMutation(state, payload) {
            state.teacherLists = payload;
        },
        getExamTypeMutation(state, payload) {
            state.examTypeLists = payload;
        },
        /**
         * 院校改变重置下级联动下拉
         */
        resetShoolMutation(state) {
            if (state.majorLists && state.majorLists.length > 0) {//专业
                state.majorLists = [];
            }

            if (state.gradeLists && state.gradeLists.length > 0) {//班级
                state.gradeLists = [];
            }

            if (state.readTeacher && state.readTeacher.length > 0) {//阅卷老师
                state.readTeacher = [];
            }

            if (state.teacherLists && state.teacherLists.length > 0) {//老师
                state.teacherLists = [];
            }
        },
        /**
         * 专业改变重置下级联动下拉
         */
        resetMajorMutation(state) {
            if (state.specialtyLists && state.specialtyLists.length > 0) {//课程
                state.specialtyLists = [];
            }
            if (state.gradeLists && state.gradeLists.length > 0) {//班级
                state.gradeLists = [];
            }
            if (state.teacherLists && state.teacherLists.length > 0) {//老师
                state.teacherLists = [];
            }
        }
    },
    actions: {
        // 获取学院
        getSchoolListAction({ commit }) {
            commit('resetShoolMutation');
            return common.schoolsList({}).then(res => {
                if (res.code == 0) {
                    commit('getSchoolListMutations', res.data);
                }
            });
        },
        // 获取专业
        getMajorListAction({ commit }, payload) {
            commit('resetMajorMutation');
            const params = {
                "conditionModel": {
                    "schoolUuid": payload.schoolUuid, //学校id
                },
            };
            return common.majorList(params).then(res => {
                if (res.code == 0) {
                    commit('getMajorListMutations', res.data);
                }
            });
        },
        // 获取课程
        async getStudyManageAction({ commit }, payload) {
            const params = {
                "conditionModel": {
                    "schoolUuid": payload.schoolUuid, //学校id
                    "majorUuid": payload.majorUuid, //专业id
                    "type": payload.type // 课程类型
                },
            };
            const res = await studyManage.getSpecialtyList(params);
            if (res.code == 0) {
                commit('getStudyManageMutation', res.data);
            }
        },
        // 获取班级
        async getGradeListAction({ commit }, payload) {
            const params = {
                "conditionModel": {
                    "schoolUuid": payload.schoolUuid, //学校id
                    "majorUuid": payload.majorUuid, //专业id
                },
            };
            const res = await grade.selectGrade(params);
            if (res.code == 0) {
                commit('getGradeListMutation', res.data);
            }
        },
        // 获取某个学院下的阅卷老师
        async getReadTeacherAction({ commit }, payload) {
            const params = {
                "collegeUuid": payload.schoolUuid, //学校id
            };
            const res = await common.readTeacher(params);
            if (res.code == 0) {
                commit('getReadTeacherMutation', res.data);
            }
        },
        // 获取某个学院下，专业下的授课老师/班主任
        async getTeacherAction({ commit }, payload) {
            const params = {
                conditionModel: {
                    "schoolUuid": payload.schoolUuid, //学校id
                    "majorUuid": payload.majorUuid, //专业id
                    "teacherType": payload.type//老师类型(yuejuan:阅卷老师,banzhuren:班主任,shangke:上课,check:阅卷督查)
                }
            };
            const res = await account.getTeacherList(params);
            if (res.code == 0) {
                commit('getTeacherMutation', res.data);
            }
        },
        // 获取某个学院下试卷分类
        async getExamTypeAction({ commit }, payload) {
            const params = {
                "collegeUuid": payload.schoolUuid, //学校id
                "courseUuid": payload.courseUuid, //学校id
            };
            const res = await common.getExamTypes(params);
            if (res.code == 0) {
                commit('getExamTypeMutation', res.data);
            }
        },
    },
    getters: {

    },
};
