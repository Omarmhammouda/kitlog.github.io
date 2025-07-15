"""Update team membership schema

Revision ID: 002
Revises: 001
Create Date: 2025-01-15

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None


def upgrade():
    # Update team_memberships table
    op.alter_column('team_memberships', 'user_id', type_=sa.String(), nullable=False)
    op.add_column('team_memberships', sa.Column('user_name', sa.String(), nullable=True))
    op.add_column('team_memberships', sa.Column('user_email', sa.String(), nullable=True))
    
    # Update team_invitations table
    op.alter_column('team_invitations', 'invited_by_user_id', type_=sa.String(), nullable=False)
    op.add_column('team_invitations', sa.Column('invited_by_name', sa.String(), nullable=True))


def downgrade():
    # Reverse the changes
    op.drop_column('team_invitations', 'invited_by_name')
    op.alter_column('team_invitations', 'invited_by_user_id', type_=sa.Integer(), nullable=False)
    
    op.drop_column('team_memberships', 'user_email')
    op.drop_column('team_memberships', 'user_name')
    op.alter_column('team_memberships', 'user_id', type_=sa.Integer(), nullable=False)
