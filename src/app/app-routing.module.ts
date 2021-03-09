import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SinglePostComponent } from "./posts/single-post/single-post.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'auth',
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: 'counter',
        loadChildren: () => import("./counter/counter.module").then(m => m.CounterModule)
    },
    {
        path: 'posts',
        canActivate: [AuthGuard],
        loadChildren: () => import("./posts/post.module").then(m => m.PostModule)
    },
    {
        path: 'posts/details/:id',
        component: SinglePostComponent,
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }