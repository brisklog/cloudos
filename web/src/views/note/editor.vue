<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { ElMessage } from "element-plus"
import { noteInfoApi, noteSaveApi } from "@/api/note"

const route = useRoute()

defineOptions({
    name: "NoteEditor"
})

const formData = ref({
    id: 0,
    title: "",
    content: "",
    labels: [] as number[],
    topics: [] as number[]
})

const labels = ref<string[]>([])
const topics = ref<string[]>([])

// 内容变化时触发的事件。text 为输入的内容，html 为解析之后的 html 字符串。
const handleChange = (text: string, html: string) => {}

const handleSave = (text: string, html: string) => {
    noteSaveApi({
        id: formData.value.id,
        title: formData.value.title,
        content: formData.value.content,
        topics: formData.value.topics,
        labels: formData.value.labels
    })
        .then(() => {
            ElMessage.success("保存成功")
        })
        .catch((reason: string) => {
            ElMessage.error("保存失败: 服务器异常")
        })
}

onMounted(() => {
    let id: number = route.query.id as any
    if (id > 0) {
        noteInfoApi(route.query.id as any).then((resp) => {
            formData.value.id = resp.data.id
            formData.value.title = resp.data.title
            formData.value.content = resp.data.content
            formData.value.labels = resp.data.labels
            formData.value.topics = resp.data.topics
        })
    }
})

const newValue = computed({
    get() {
        return formData.value.content
    },
    set(value: string) {
        formData.value.content = value
    }
})

const lebelOptions = [
    {
        value: "HTML",
        label: "HTML"
    },
    {
        value: "CSS",
        label: "CSS"
    },
    {
        value: "JavaScript",
        label: "JavaScript"
    }
]
</script>

<template>
    <div class="app-container center" style="height: 100%">
        <el-input v-model="formData.title" size="large" placeholder="Please input">
            <template #prepend>标题</template>
        </el-input>

        <!-- <el-select v-model="labels" multiple filterable allow-create default-first-option :reserve-keyword="false"
            placeholder="Choose tags for your article">
            <el-option v-for="item in lebelOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->
        <div style="height: 96%">
            <v-md-editor v-model="newValue" height="100%" @change="handleChange" @save="handleSave" />
        </div>
    </div>
</template>
