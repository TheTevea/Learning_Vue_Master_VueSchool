export interface CreateNewTask {
    name: string;
    slug?: string;
    description: string;
    project_id: number;
    profile_id: string;
}
